import Pet from "./Pet";

export default interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
  email?: string;
  picture?: BinaryData[];
  pets?: Pet[];
}

export interface UserInformation {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
  email?: string;
  picture?: BinaryData[];
}

export interface LoggedUser {
  bearer?: string;
  User?: User;
}
