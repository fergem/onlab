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
  bearer?: string;
}

export interface UserInformation {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
  email?: string;
  picture?: BinaryData[];
}

export interface RegisterModel {
  userName?: string;
  email?: string;
  password?: string;
}

export interface LoginModel {
  userName?: string;
  password?: string;
}
