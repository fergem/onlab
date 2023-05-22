import Status, { StatusName } from "./Status";
import { UserInformation } from "./User";

export default interface Job {
  id: number;
  hours?: number;
  location?: string;
  description?: string;
  payment?: number;
  ownerUserInformation?: UserInformation;
  petSitterUserInformation?: UserInformation;
  minRequiredExperience?: number;
  status?: Status;
}

export interface JobHoursRange {
  minHours?: number;
  maxHours?: number;
}

export interface JobParameters {
  jobHoursRange?: JobHoursRange;
  statusName?: StatusName;
}
