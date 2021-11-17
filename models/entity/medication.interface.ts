import { ISchedule, ISingle } from "..";

export interface IMedication extends ISingle {
  name: string,
  schedule: ISchedule
}
