import { IGuid } from "..";

export interface ITake extends IGuid {
  guid: string,
  planned: Date,
  snoozed?: Date,
  taken?: Date,
  skipped?: Date
}
