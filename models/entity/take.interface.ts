import { ISingle } from "..";

export interface ITake extends ISingle {
  planned: Date,
  snoozed?: Date,
  taken?: Date,
  skipped?: Date
}
