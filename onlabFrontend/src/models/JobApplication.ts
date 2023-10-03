import { JobApplicationComment } from "./JobApplicationComment";

export interface JobApplication {
  ID: number;
  isApproved: boolean;
  comments: JobApplicationComment[];
  applicantUserID: number;
}
