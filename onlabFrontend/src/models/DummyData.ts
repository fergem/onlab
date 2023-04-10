import Job from "./Job";
import Pet from "./Pet";
import Status from "./Status";

export const dummyJobs: Job[] = [
  {
    id: 1,
    hours: 4,
    location: "Szeged",
    description: "Kutyára kell vigyázni",
    status: {
      id: 1,
      name: "Available",
    },
    ownerUser: undefined,
    appliedUser: undefined,
  },
  {
    id: 2,
    hours: 3,
    location: "Szolnok",
    description: "Cicára kell vigyázni",
    status: {
      id: 2,
      name: "In progress",
    },
    ownerUser: undefined,
    appliedUser: undefined,
  },
  {
    id: 3,
    hours: 7,
    location: "Jászkarajenő",
    description: "Teknőcre kell vigyázni",
    status: {
      id: 3,
      name: "Done",
    },
    ownerUser: undefined,
    appliedUser: undefined,
  },
];

export const pets: Pet[] = [
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

const statuses: Status[] = [
  {
    id: 1,
    name: "Available",
  },
  {
    id: 2,
    name: "In progress",
  },
  {
    id: 3,
    name: "Done",
  },
];
