export default interface Pet {
  id?: number;
  name: string;
  description: string;
  species: PetSpecies;
  age: number;
  image?: PetImage;
}

export enum PetSpecies {
  Dog = "Dog",
  Cat = "Cat",
  Bird = "Bird",
  Horse = "Horse",
  Fish = "Fish",
  SmallMammal = "Small Mammal",
  Lizard = "Lizard",
  Exotic = "Exotic",
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
