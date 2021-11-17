import { IId, ISingle } from ".";

export interface IEntityRepository {
  Create(body: ISingle): IId
  GetOne(id: number): IId | null
  GetMany(): IId[]
  Update(body: IId): IId
  DeleteOne(id: number): void
}
