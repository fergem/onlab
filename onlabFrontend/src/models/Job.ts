import Pet from "./Pet";
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

  pets?: Pet[];

  repeated?: boolean;
  days?: Days[];
  type?: JobType;
  startDate?: Date;
  endDate?: Date;
  title?: string;
}

export enum Days {
  Mon = "Mon",
  Tue = "Tue",
  Wed = "Wed",
  Thu = "Thu",
  Fri = "Fri",
  Sat = "Sat",
  Sun = "Sun",
}

export enum JobType {
  Sitting = "Sitting",
  Boarding = "Boarding",
  Walking = "Walking",
  Visit = "Visit",
}
export enum Status {
  Empty = "Empty",
  Available = "Available",
  WaitingForApproval = "WaitingForApproval",
  Inprogress = "Inprogress",
  Done = "Done",
}

export function getJobTypes() {
  const types = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(JobType)) {
    types.push({ value: key, label: value });
  }
  return types;
}

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

export interface JobParameters {}

export const DefaultJobParameters: JobParameters = {};

export const JobValidation = {
  validateLocation(val: string) {
    if (val.length === 0) return "Location is required";
    return null;
  },
  validateDescription(val: string) {
    if (val.length === 0) return "Description is required";
  },
};
