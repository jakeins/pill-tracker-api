import { IGuid, ITake } from "..";

export interface ISchedule extends IGuid {
  guid: string,
  summary: string,
  takes: ITake[]
}
