import { ISingle } from "..";

export interface IProfile extends ISingle {
  name: string;
  acceptedTreatmentIds: number[];
  declinedTreatmentIds: number[];
}
