export default interface Status {
  id: number;
  name: StatusName;
}

export enum StatusName {
  Available = "Available",
  WaitingForApproval = "WaitingForApproval",
  Inprogress = "Inprogress",
  Done = "Done",
}
