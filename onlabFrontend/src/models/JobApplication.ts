import { JobApplicationComment } from "./JobApplicationComment";
import { UserDetails } from "./User";

export interface JobApplication {
  id: number;
  status: JobApplicationStatus;
  comments?: JobApplicationComment[];
  applicantUser: UserDetails;
}

export enum JobApplicationStatus {
  All = "All",
  Approving = "Approving",
  Approved = "Approved",
  NotApproved = "NotApproved",
  Canceled = "Canceled",
}

export const JobApplicationStatusData = [
  { value: JobApplicationStatus.All, label: "All applications" },
  {
    value: JobApplicationStatus.Approved,
    label: JobApplicationStatus.Approved,
  },
  {
    value: JobApplicationStatus.Approving,
    label: JobApplicationStatus.Approving,
  },
  {
    value: JobApplicationStatus.NotApproved,
    label: "Not Approved",
  },
  {
    value: JobApplicationStatus.Canceled,
    label: JobApplicationStatus.Canceled,
  },
];
