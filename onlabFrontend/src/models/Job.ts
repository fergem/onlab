import Pet, { PetSpecies } from "./Pet";
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
  days?: Day[];
  type?: JobType;
  startDate?: Date;
  endDate?: Date;
  title?: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const JobFunctions = {
  deserializeJobFromStorage(localStorageValue: string) {
    const value = JSON.parse(localStorageValue) as JobFilter;
    const startDate = new Date(value.startDate);
    const endDate = value.endDate ? new Date(value.endDate) : undefined;

    return { ...value, startDate, endDate };
  },
};

export enum Day {
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

export interface JobHoursRange {
  minHours?: number;
  maxHours?: number;
}

export interface JobFilter {
  type: JobType;
  species?: PetSpecies[];
  startDate: Date;
  endDate?: Date;
  repeated: boolean;
  days?: Day[];
}

const getDatePlusThreeDays = () => {
  const today = new Date();
  const newDate = new Date(today);
  newDate.setDate(newDate.getDate() + 10);
  return newDate;
};

export const DefaultJobFilter: JobFilter = {
  type: JobType.Sitting,
  species: [PetSpecies.Dog, PetSpecies.Cat],
  startDate: new Date(),
  endDate: getDatePlusThreeDays(),
  repeated: false,
  days: undefined,
};

export enum Frequency {
  Once = "Once",
  Repeat = "Repeat",
}

export interface CreateJobModel {
  hours: number;
  location: string;
  description: string;
  minRequiredExperience: number;
  payment: number;

  title: string;

  repeated: boolean;
  days?: Day[];
  type: JobType;
  startDate: Date;
  endDate?: Date;
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
