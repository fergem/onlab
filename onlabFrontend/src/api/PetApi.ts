import axios from "axios";
import { useEffect, useState } from "react";
import Pet from "../models/Pet";

export const LoadPetsFromApi = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  useEffect(() => {
    axios.get<Pet[]>("/api/pets").then((response) => {
      console.log(response.data);
      setPets(response.data);
    });
  }, []);

  return pets;
};
