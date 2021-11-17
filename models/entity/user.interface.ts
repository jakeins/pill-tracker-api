import { IId, IProfile } from "..";

export interface IUser extends IId {
  id: number,
  login: string,
  profiles: IProfile[]
}
