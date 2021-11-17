import { ISingle } from "..";

export interface IProfile extends ISingle {
  name: string
  treatmentIds: number[]
}
