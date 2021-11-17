import { ISingle } from "..";

export interface IPermission extends ISingle {
  canWatch: boolean,
  canTake: boolean,
  canEdit: boolean
}
