import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { PostedJobApplication } from "./JobApplication";
import { Pet, PetSpecies } from "./Pet";
import { UserPreview } from "./User";

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const JobFunctions = {
  deserializeJobFromStorage(localStorageValue: string) {
    const value = JSON.parse(localStorageValue) as JobFilter;
    const startDate = new Date(value.startDate);
    const endDate = value.endDate ? new Date(value.endDate) : undefined;

    return { ...value, startDate, endDate };
  },

  insideOfDate(day: Date, startDate: Date, endDate?: Date) {
    dayjs.extend(isBetween);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isSameOrBefore);

    // dayjs(day).isBetween(dayjs(startDate), dayjs(endDate ?? startDate));
    if (!endDate) {
      return dayjs(day).isSame(dayjs(startDate), "day");
    }

    return (
      dayjs(day).isSameOrAfter(dayjs(startDate), "day") &&
      dayjs(day).isSameOrBefore(dayjs(endDate), "day")
    );
  },

  generateShadeOfBlue(shadeLevel: number | undefined) {
    if (!shadeLevel || shadeLevel < 0 || shadeLevel > 7) {
      return "blue";
    }

    const blueComponent = 255 - shadeLevel * 30;

    let blueHex = blueComponent.toString(16);

    if (blueHex.length === 1) {
      blueHex = `0${blueHex}`;
    }

    return `#0000${blueHex}`;
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
  All = "All",
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

export interface JobHoursRange {
  minHours?: number;
  maxHours?: number;
}

export interface JobUserAppliedTo {
  id: number;
  title: string;
  startDate: Date;
  endDate?: Date;
  type: string;
  days?: Day[];
  repeated: boolean;
  jobApplicationID: number;
  ownerUserPicture: string;
  displayPetPicture: string;
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
  { value: Status.All, label: Status.All },
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
  status: Status.All,
};

export interface JobFilter {
  type: JobType;
  species?: PetSpecies[];
  startDate: Date;
  endDate?: Date;
  repeated: boolean;
  days?: Day[];
}

export interface PostedJob {
  id: number;
  title: string;
  startDate: Date;
  endDate?: Date;
  type: JobType;
  status: Status;
  days?: Day[];
  description: string;
  jobApplications: PostedJobApplication[];
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

export interface JobDetails {
  id: number;
  location: string;
  repeated: boolean;
  title: string;
  type: JobType;
  startDate: Date;
  endDate?: Date;
  description: string;
  payment: number;
  minRequiredExperience: number;
  ownerUser: UserPreview;
  pets: Pet[];
  days?: Day[];
  status: Status;
}

export interface JobPreview {
  id: number;
  location: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  type: string;
  days?: Day[];
  catCount: number;
  dogCount: number;
  ownerUserPicture?: string;
  displayPetPicture?: string;
  ownerID: number;
}

export interface JobPreviewWithColor extends JobPreview {
  color: string;
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
