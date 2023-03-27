import User from "./User";

export default interface Job {
  id?: number;
  hours: number;
  location: string;
  description: string;
  //   ownerUser: User | null;
  //   applicantUser: User | null;
}
