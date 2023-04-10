import Pet from "./Pet";

export default interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  age?: number;
  picture?: BinaryData[];
  pets?: Pet[];
}

export default interface LoggedUser {
  bearer?: string;
  User?: User;
}
