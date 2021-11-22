import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import path from 'path';
import { ConfigContainer } from '../containers';

import { IEntityRepository, IId, ISingle } from "../models";

export class JsonDbRepository implements IEntityRepository {

  private db: JsonDB;

  constructor(private entityType: string) {
    if (entityType.length < 1) {
      throw 'Cannot have empty entity type';
    }

    this.db = new JsonDB(new Config(path.join(__dirname, ConfigContainer.DatabasePath), true, true, '/'));

    // Init collection db.
    if (!this.db.exists(this.collectionPath)) {
      this.db.push(this.collectionPath, [], true);
    }
  }

  public Create(body: ISingle): IId {
    this.db.save();

    const entries = this.db.getData(this.collectionPath) as IId[];

    let maxId = Math.max(...entries.map(e => e.id));
    maxId = maxId > 0 ? maxId : 0;

    const newId = maxId + 1;

    const entry = {
      ...body,
      id: newId
    };

    this.db.push(this.collectionPath + "[]", entry, true);

    const result = this.GetOne(newId) as IId;

    if (!result) {
      throw `JsonDbRepo.Create:: Something went wrong.`;
    }

    this.db.save();
    return result;
  }

  public GetOne(id: number): IId | null {
    this.db.save();

    const index = this.db.getIndex(this.collectionPath, id);

    if (index < 0) {
      console.log(`JsonDbRepo.GetOne:: Missing ${this.entityType} #${id}.`);
      return null;
    }

    const result = this.db.getData(this.collectionPath + "[" + index + "]");

    this.db.save();
    return result;
  }

  public GetMany(): IId[] {
    this.db.save();

    const result = this.db.getData(this.collectionPath);

    this.db.save();
    return result;
  }

  public Update(body: IId): IId {
    this.db.save();

    let entry = this.GetOne(body.id);

    if (!entry) {
      throw `JsonDbRepo.Update:: Missing ${this.entityType} #${body.id}.`;
    }

    const index = this.db.getIndex(this.collectionPath, body.id);

    entry = {
      ...entry,
      ...body,
      id: entry.id
    };

    this.db.push(this.collectionPath + "[" + index + "]", entry, true);

    const result = this.GetOne(entry.id) as IId;

    if (!result) {
      throw `JsonDbRepo.Update: Something went wrong.`;
    }

    this.db.save();
    return result;
  }

  public DeleteOne(id: number): void {
    this.db.save();

    const index = this.db.getIndex(this.collectionPath, id);
    this.db.delete(this.collectionPath + "[" + index + "]")

    this.db.save();
  }

  private get collectionPath(): string {
    return "/" + this.entityType + "_collection";
  }
}
