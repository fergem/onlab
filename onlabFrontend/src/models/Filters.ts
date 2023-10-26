import { Status } from "./Job";
import { JobApplicationStatus } from "./JobApplication";

export interface JobApplicationFilter {
  jobStatus: Status;
  jobApplicationStatus: JobApplicationStatus;
}

export const DefaultJobApplicationFilter: JobApplicationFilter = {
  jobStatus: Status.All,
  jobApplicationStatus: JobApplicationStatus.All,
};

export const DefaultJobApplicationtData = [
  { value: JobApplicationStatus.All, label: JobApplicationStatus.All },
  {
    value: JobApplicationStatus.Approved,
    label: JobApplicationStatus.Approved,
  },
  {
    value: JobApplicationStatus.Approving,
    label: JobApplicationStatus.Approving,
  },
  {
    value: JobApplicationStatus.Canceled,
    label: JobApplicationStatus.Canceled,
  },
];
