import { ISingle, ITake } from "..";

export interface ISchedule extends ISingle {
  summary: string,
  takes: ITake[]
}
