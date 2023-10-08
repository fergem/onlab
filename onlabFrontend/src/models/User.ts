import { OwnerProfile, UpdateOwnerProfileModel } from "./OwnerProfile";
import {
  PetSitterProfile,
  UpdatePetSitterProfileModel,
} from "./PetSitterProfile";

export interface UserDetailsWithoutProfiles {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  location?: string;
  phoneNumber?: string;
  picture?: string;
}

export interface UserDetails extends UserDetailsWithoutProfiles {
  ownerProfile?: OwnerProfile;
  petSitterProfile?: PetSitterProfile;
}

export interface User {
  id: number;
  userName: string;
  bearer?: string;
  roles: UserRoles[];
  refreshToken?: string;
}

export enum UserRoles {
  Owner = "Owner",
  PetSitter = "PetSitter",
}
export interface RefreshTokenModel {
  accessToken: string;
  refreshToken: string;
}

export interface UserPreview {
  id: number;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

export interface UpdateUserDetailsModel {
  firstName?: string;
  lastName?: string;
  age?: number;
  email?: string;
  location?: string;
  phoneNumber?: string;
}

export interface UpdateUserModel extends UpdateUserDetailsModel {
  ownerProfile?: UpdateOwnerProfileModel;
  petSitterProfile?: UpdatePetSitterProfileModel;
}

export interface RegisterModel {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isOwner: boolean;
  isPetSitter: boolean;
}

export interface LoginModel {
  userName: string;
  password: string;
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

  roleValidation(val1: boolean, val2: boolean) {
    if (!val1 && !val2) return "Atleast one role should be picked";
  },
};
