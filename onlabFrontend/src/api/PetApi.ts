import axios from "axios";
import { useEffect, useState } from "react";
import Pet from "../models/Pet";

export const LoadPetsFromApi = async () => {
  return await axios.get<Pet[]>("http://localhost:5282/api/pets");
};
