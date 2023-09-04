export default interface Pet {
  id: number;
  name: string;
  description: string;
  species: string;
  age: number;
  image: PetImage;
}

export interface PetImage {
  id: number;
  picture: string;
}

export const PetValidation = {};
