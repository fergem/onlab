import { JobApplicationComment } from "./JobApplicationComment";
import { UserPreview } from "./User";

export interface JobApplication {
  id: number;
  isApproved: boolean;
  comments?: JobApplicationComment[];
  applicantUser: UserPreview;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const JobApplicationFunctions = {
  orderJobApplicationsByLastCommentDate(
    jobApplications: JobApplication[]
  ): JobApplication[] {
    return jobApplications.sort((a, b) => {
      // Get the newest comment date for each application (or use a default date if no comments)
      const newestCommentDateA = a.comments?.length
        ? Math.max(
            ...a.comments.map((comment) =>
              new Date(comment.commentDate).getTime()
            )
          )
        : 0;
      const newestCommentDateB = b.comments?.length
        ? Math.max(
            ...b.comments.map((comment) =>
              new Date(comment.commentDate).getTime()
            )
          )
        : 0;

      // Compare the newest comment dates to determine the order
      if (newestCommentDateA < newestCommentDateB) {
        return 1; // Sort B before A (newest comment first)
      }
      if (newestCommentDateA > newestCommentDateB) {
        return -1; // Sort A before B (newest comment first)
      }
      return 0; // Dates are equal
    });
  },
};
