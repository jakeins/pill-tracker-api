import { IId, IMedication, IUserPermission } from "..";

export interface ITreatment extends IId {
  id: number,
  author: string,
  name: string,
  medications: IMedication[]
  userPermissions: IUserPermission[]
}
