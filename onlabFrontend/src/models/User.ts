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
  accessToken?: string;
  roles: UserRole[];
  refreshToken?: string;
  picture?: string;
}

export enum UserRole {
  Owner = "Owner",
  PetSitter = "PetSitter",
}

export interface RefreshTokenModel {
  accessToken?: string;
  refreshToken?: string;
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

export const defaultUpdateUserDetailsModel: UpdateUserDetailsModel = {
  firstName: "",
  lastName: "",
  age: 0,
  email: "",
  location: "",
  phoneNumber: "",
};

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

export interface UpdatePasswordModel {
  password: string;
  confirmPassword: string;
}

export const UserValidation = {
  userNameValidation(val: string) {
    if (!val) return "Username is required.";
    if (val.length < 6) return "Username must be at least 6 characters long.";
    if (val.length > 10) return "Username cannot exceed 10 characters.";
    if (!/^[a-zA-Z0-9_-]*$/.test(val))
      return "Username can only contain letters, numbers, hyphens, and underscores.";
    return null;
  },

  passwordValidation(val: string) {
    if (!val) return "Password is required.";
    if (val.length < 8) return "Password must be at least 8 characters long.";
    if (val.length > 15) return "Password cannot exceed 15 characters.";
    if (!/[A-Z]/.test(val))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(val))
      return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(val)) return "Password must contain at least one digit.";
    if (!/[^a-zA-Z0-9]/.test(val))
      return "Password must contain at least one special character.";
    return null;
  },

  emailValidation(val: string) {
    if (!val) return "Email is required.";
    if (!/^\S+@\S+$/.test(val)) return "Invalid email format.";
    return null;
  },

  isNotEmpty(val: string, message: string) {
    if (!val) return message;
    return null;
  },

  roleValidation(val1: boolean, val2: boolean) {
    if (!val1 && !val2) return "Pick one role.";
    return null;
  },

  passwordSameValidation(val1: string, val2: string) {
    if (!val1) return "Password is required.";
    if (val2 !== val1) return "Passwords do not match!";
    return null;
  },
};

export const UserFunctions = {
  toRoleDisplay(userRoles?: UserRole[]) {
    if (!userRoles) return "";
    if (
      userRoles.includes(UserRole.Owner) &&
      userRoles.includes(UserRole.PetSitter)
    ) {
      return "Owner and Pet sitter";
    }
    if (userRoles.length === 1 && userRoles.includes(UserRole.Owner)) {
      return "Owner";
    }
    if (userRoles.length === 1 && userRoles.includes(UserRole.PetSitter)) {
      return "Pet sitter";
    }
    return "";
  },
};
