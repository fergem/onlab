import OwnerProfile from "./OwnerProfile";
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
  location?: string;
  ownerProfile?: OwnerProfile;
}

export interface UserInformation {
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
  email?: string;
  location?: string;
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

export const Validation = {
  userNameValidation(val: string) {
    if (val.length < 4) return "Username is too short";
    if (val.length > 10) return "Username is too long";
    return null;
  },

  passwordValidation(val: string) {
    if (val.length < 4) return "Password is too short";
    if (val.length > 10) return "Password  is too long";
    return null;
  },

  emailValidation(val: string) {
    return /^\S+@\S+$/.test(val) ? null : "Invalid email";
  },
};
