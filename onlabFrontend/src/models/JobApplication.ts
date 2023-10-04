import { JobApplicationComment } from "./JobApplicationComment";

export interface JobApplication {
  id: number;
  isApproved: boolean;
  comments?: JobApplicationComment[];
  applicantUserID: number;
}
