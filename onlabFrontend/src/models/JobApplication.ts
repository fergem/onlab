import { JobApplicationComment } from "./JobApplicationComment";
import { UserDetails, UserPreview } from "./User";

export interface JobApplication {
  id: number;
  status: JobApplicationStatus;
  comments?: JobApplicationComment[];
  applicantUser: UserPreview;
}

export interface PostedJobApplication {
  id: number;
  status: JobApplicationStatus;
  applicantUser: UserDetails;
}

export enum JobApplicationStatus {
  All = "All",
  Approving = "Approving",
  Approved = "Approved",
  NotApproved = "NotApproved",
  Canceled = "Canceled",
}

export interface JobApplicationChat {
  id: number;
  status: JobApplicationStatus;
  comments?: JobApplicationComment[];
  jobTitle: string;
  startDate: Date;
  endDate?: Date;
  type: string;
  repeated: boolean;
  applicantUser: UserPreview;
  ownerUser: UserPreview;
  displayPetPicture?: string;
}
