export interface OwnerProfile {
  id: number;
  description?: string;
  minRequiredExperience?: number;
  minWage?: number;
}

export interface UpdateOwnerProfileModel {
  description?: string;
  minRequiredExperience?: number;
  minWage?: number;
}

export const defaultUpdateOwnerProfileModel: UpdateOwnerProfileModel = {
  description: "",
  minRequiredExperience: 0,
  minWage: 0,
};
