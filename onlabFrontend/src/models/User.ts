import OwnerProfile from "./OwnerProfile";
import Pet from "./Pet";

export default interface User extends UserInformation {
  id: number;
  userName?: string;
  pets?: Pet[];
  bearer?: string;
  ownerProfile?: OwnerProfile;
  picture?: string;
}

export interface UserInformation {
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  location?: string;
  phoneNumber?: string;
}

export interface UpdateUserModel {
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  location?: string;
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

export const UserValidation = {
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

  passwordSameValidation(val1: string, val2: string) {
    if (val2 !== val1) return "Passwords are not identical!";
  },
};
