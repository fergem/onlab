import { JobApplicationComment } from "./JobApplicationComment";
import { UserPreview } from "./User";

export interface JobApplication {
  id: number;
  isApproved: boolean;
  comments?: JobApplicationComment[];
  applicantUser: UserPreview;
}
