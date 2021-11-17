import { IGuid, ISchedule } from "..";

export interface IMedication extends IGuid {
  guid: string,
  name: string,
  schedule: ISchedule
}
