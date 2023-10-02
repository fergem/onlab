import Pet, { PetSpecies } from "./Pet";
import { UserInformation } from "./User";

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
  Approving = "Approving",
  Upcoming = "Upcoming",
  Done = "Done",
  Canceled = "Canceled ",
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

export interface CreateJobDetailsModel {
  location: string;
  description: string;
  minRequiredExperience: number;
  payment: number;

  title: string;
}

export const JobFilterParticipantData = [
  { value: Status.Available, label: Status.Available },
  { value: Status.Approving, label: Status.Approving },
  { value: Status.Upcoming, label: Status.Upcoming },
  { value: Status.Done, label: Status.Done },
  { value: Status.Canceled, label: Status.Canceled },
];

export interface JobFilterParticipant {
  status: Status;
}
export const DefaultJobFilterParticipant = {
  status: Status.Upcoming,
};

export interface JobFilter {
  type?: JobType;
  species?: PetSpecies[];
  startDate: Date;
  endDate?: Date;
  repeated: boolean;
  days?: Day[];
}

export interface CreateJobServiceModel {
  repeated: boolean;
  days?: Day[];
  type: JobType;
  startDate: Date;
  endDate?: Date;
}

export interface CreateJobPetSelectorModel {
  petIDs: number[];
}

export type CreateJobModel = CreateJobDetailsModel &
  CreateJobServiceModel &
  CreateJobPetSelectorModel;

export const JobValidation = {
  validateLocation(val: string) {
    if (val.length === 0) return "Location is required";
    return null;
  },
  validateDescription(val: string) {
    if (val.length === 0) return "Description is required";
  },
};

export default interface Job {
  id: number;
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

export const Defaultjob: CreateJobModel = {
  petIDs: [],
  type: JobType.Sitting,
  startDate: new Date(),
  endDate: undefined,
  repeated: false,
  days: undefined,
  location: "",
  description: "",
  minRequiredExperience: 0,
  payment: 0,
  title: "",
};
