import { ArrayFunctions } from "../utility/array";
import { DateFunctions } from "../utility/date";

export interface JobApplicationComment {
  ID: number;
  commentText: number;
  commentDate: Date;
  senderUserID: number;
}

export interface InsertJobApplicationCommentModel {
  applicationID: number;
  message: string;
}

export const JobApplicationCommentFunctions = {
  isOlderThanBefore(
    comments: JobApplicationComment[] | undefined,
    comment: JobApplicationComment
  ) {
    const commentBefore = ArrayFunctions.findElementBefore(comments, comment);
    if (!commentBefore) return false;
    if (
      DateFunctions.isTimeDifferenceGreaterThan30Minutes(
        new Date(commentBefore.commentDate),
        new Date(comment.commentDate)
      )
    )
      return true;
    return false;
  },
};
