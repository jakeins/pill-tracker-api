import { IPermission, ISingle } from "..";

export interface IUserPermission extends ISingle {
  login: string,
  permission: IPermission
}
