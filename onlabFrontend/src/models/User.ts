import Pet from "./Pet";

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  picture: BinaryData[];
  pets: Pet[];
}