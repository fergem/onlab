export default interface Status {
  id: number;
  name: StatusName;
}

export enum StatusName {
  Empty = "Empty",
  Available = "Available",
  WaitingForApproval = "WaitingForApproval",
  Inprogress = "Inprogress",
  Done = "Done",
}
