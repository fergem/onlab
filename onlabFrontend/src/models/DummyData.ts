import Job from "./Job";
import Pet from "./Pet";

export const jobs: Job[] = [
  {
    id: 1,
    hours: 4,
    location: "Szeged",
    jobDescription: "Kutyára kell vigyázni",
  },
  {
    id: 2,
    hours: 3,
    location: "Szolnok",
    jobDescription: "Cicára kell vigyázni",
  },
  {
    id: 3,
    hours: 7,
    location: "Jászkarajenő",
    jobDescription: "Teknőcre kell vigyázni",
  },
];

const pets: Pet[] = [
  { id: 1, name: "Cica", description: "szep cica", species: "cica", age: 7 },
  {
    id: 2,
    name: "Kutyo",
    description: "szep kutya",
    species: "kutya",
    age: 2,
  },
  {
    id: 3,
    name: "Teknoc",
    description: "szep teknoc",
    species: "teknoc",
    age: 10,
  },
];
