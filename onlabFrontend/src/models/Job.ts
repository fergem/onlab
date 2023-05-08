import Status from "./Status";
import { UserInformation } from "./User";

export default interface Job {
  id?: number;
  hours: number;
  location: string;
  description: string;
  payment: number;
  ownerUserInformation: UserInformation;
  appliedUserInformation: UserInformation | undefined;
  status: Status;
}

export interface JobHoursRange {
  minHours: number;
  maxHours: number;
}
