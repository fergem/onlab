import Pet from "./Pet";

export default interface User {
  bearer?: string;
  user: {
    id?: number;
    firstName?: string;
    lastName?: string;
    userName?: string;
    age?: number;
    picture?: BinaryData[];
    pets?: Pet[];
  };
}
