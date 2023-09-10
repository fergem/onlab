import Pet from "./Pet";
import Status, { StatusName } from "./Status";
import { UserInformation } from "./User";

export default interface Job {
  id?: number;
  hours?: number;
  location?: string;
  description?: string;
  payment?: number;
  ownerUserInformation?: UserInformation;
  petSitterUserInformation?: UserInformation;
  minRequiredExperience?: number;
  status?: Status;
  pets?: Pet[];
}

export const JobValidation = {
  validateLocation(val: string) {
    if (val.length === 0) return "Location is required";
    return null;
  },
  validateDescription(val: string) {
    if (val.length === 0) return "Description is required";
  },
};
export interface JobWithPetIDs extends Job {
  petIDs: number[];
}

export interface CreateJobModel {
  hours: number;
  location: string;
  description: string;
  minRequiredExperience: number;
  payment: number;
}

export interface JobHoursRange {
  minHours?: number;
  maxHours?: number;
}

export interface JobParameters {
  jobHoursRange?: JobHoursRange;
  statusName?: StatusName;
}

export const DefaultJobParameters: JobParameters = {
  jobHoursRange: {
    minHours: 0,
    maxHours: 12,
  },
  statusName: StatusName.Available,
};
