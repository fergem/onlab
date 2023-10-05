export interface JobApplicationComment {
  ID: number;
  commentText: number;
  commentDate: Date;
  senderUserID: number;
}

export interface InsertJobApplicationComment {
  applicationID: number;
  message: string;
}
