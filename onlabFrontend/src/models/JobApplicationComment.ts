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
