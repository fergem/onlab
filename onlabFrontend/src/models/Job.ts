import Status from "./Status";
import User from "./User";

export default interface Job {
  id?: number;
  hours: number;
  location: string;
  description: string;
  ownerUser: User | undefined;
  appliedUser: User | undefined;
  status: Status;
}
