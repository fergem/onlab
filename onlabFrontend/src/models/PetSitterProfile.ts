export interface PetSitterProfile {
  id: number;
  description?: string;
  acquiredExperience?: number;
}

export interface UpdatePetSitterProfileModel {
  description?: string;
  acquiredExperience?: number;
}

export const defaultUpdatePetSitterProfileModel: UpdatePetSitterProfileModel = {
  description: "",
  acquiredExperience: 0,
};
