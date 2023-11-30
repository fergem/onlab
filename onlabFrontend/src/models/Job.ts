import dayjs from "dayjs";
import { JobApplicationStatus, PostedJobApplication } from "./JobApplication";
import { Pet, PetSpecies } from "./Pet";
import { UserPreview } from "./User";

export const JobValidation = {
  validateTitle(title: string) {
    if (title.length === 0) return "Title is required";
    return null;
  },
  validateLocation(location: string) {
    if (location.length === 0) return "Location is required";
    return null;
  },
  validateDescription(desc: string) {
    if (desc.length === 0) return "Description is required";
  },
  validatePetSelect(petIDs: number[]) {
    if (petIDs.length === 0) return "Select atleast one pet";
  },
  validateJobType(type: JobType, repeated: boolean, days?: Day[]) {
    if (!type) {
      return "Job type should be set";
    }
    if (
      (type === JobType.Boarding || type === JobType.Sitting) &&
      (repeated || (days && days.length > 0))
    ) {
      return "This type of job should not be repeated";
    }
  },
  validateEndDate(repeated: boolean, endDate?: Date) {
    if (!repeated && !endDate)
      return "End date should be set when job is not repeated";
    if (repeated && endDate)
      return "End date should not be set when job is not repeated";
    if (repeated && endDate && endDate.getDate() < dayjs().day() - 1)
      return "Cannot pick date in past";
  },
  validateStartDate(startDate: Date) {
    if (!startDate) return "Start date should be set";
    if (startDate.getDate() < dayjs().day() - 1)
      return "Cannot pick date in past";
  },
  validateDays(repeated: boolean, days?: Day[]) {
    if (repeated && days && days.length === 0)
      return "Atleast one day should be selected";
  },
};

export const JobFunctions = {
  deserializeJobFromStorage(localStorageValue: string) {
    const value = JSON.parse(localStorageValue) as JobFilter;
    const startDate = new Date(value.startDate);
    const endDate = value.endDate ? new Date(value.endDate) : undefined;

    return { ...value, startDate, endDate };
  },

  getJobTypes() {
    const types = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(JobType)) {
      types.push({ value: key, label: value });
    }
    return types;
  },
  getDatePlusThreeDays() {
    const today = new Date();
    const newDate = new Date(today);
    newDate.setDate(newDate.getDate() + 10);
    return newDate;
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
  Upcoming = "Upcoming",
  Done = "Done",
  Canceled = "Canceled",
}

export enum Frequency {
  Once = "Once",
  Repeat = "Repeat",
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

export interface CreateJobModel {
  location: string;
  description: string;
  minRequiredExperience: number;
  payment: number;
  title: string;
  jobType: JobType;
  repeated: boolean;
  days?: Day[];
  startDate: Date;
  endDate?: Date;
  petIDs: number[];
}

export const JobFilterParticipantData = [
  { value: Status.All, label: "All jobs" },
  { value: Status.Available, label: Status.Available },
  { value: Status.Upcoming, label: Status.Upcoming },
  { value: Status.Done, label: Status.Done },
  { value: Status.Canceled, label: Status.Canceled },
];

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

export interface AppliedJob {
  id: number;
  title: string;
  startDate: Date;
  endDate?: Date;
  type: JobType;
  status: Status;
  days?: Day[];
  description: string;
  applicationID: number;
  applicationStatus: JobApplicationStatus;
  catCount: number;
  dogCount: number;
  isRepeated: boolean;
}

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
  type: JobType;
  days?: Day[];
  catCount: number;
  dogCount: number;
  ownerUserPicture?: string;
  displayPetPicture?: string;
  ownerID: number;
  isRepeated: boolean;
}

export interface JobFilterDetails {
  status: Status;
}
export const DefaultJobFilterDetails = {
  status: Status.All,
};

export interface JobFilter {
  types: JobType[];
  species: PetSpecies[];
  startDate: Date;
  endDate?: Date;
  repeated: boolean;
  days?: Day[];
  pageNumber: number;
}

export const DefaultJobFilter: JobFilter = {
  types: [],
  species: [PetSpecies.Dog, PetSpecies.Cat],
  startDate: new Date(),
  endDate: JobFunctions.getDatePlusThreeDays(),
  repeated: false,
  days: undefined,
  pageNumber: 1,
};
