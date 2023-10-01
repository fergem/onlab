export default interface Pet {
  id: number;
  name: string;
  species: PetSpecies;
  age: number;
  images?: string[];
}

export interface PetInsertModel {
  name: string;
  species: PetSpecies;
  age: number;
  images?: File[];
}

export interface PetUpdateModel {
  id: number;
  name: string;
  species: PetSpecies;
  age: number;
  picture?: File;
}

export interface PetFilter {
  petIDs?: number[];
}

export enum PetSpecies {
  Dog = "Dog",
  Cat = "Cat",
}

export function getPetSpeciesValueLabel() {
  const petSpecies = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(PetSpecies)) {
    petSpecies.push({ value: key, label: value });
  }
  return petSpecies;
}

export interface PetImage {
  id?: number;
  picture: string;
}

export const PetValidation = {
  validateName(val: string) {
    if (val.length === 0) return "Name is required";
    return null;
  },
  validateDescription(val: string) {
    if (val.length === 0) return "Description is required";
  },
};
