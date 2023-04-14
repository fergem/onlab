import axios from "axios";
import Job from "../models/Job";
import Status from "../models/Status";
import { UserService } from "./UserService";

const list = async () => {
  console.log("listing");
  const response = await axios.get<Job[]>("/api/jobs");
  return response.data;
};

const listUsersPostedJobs = async () => {
  const response = await axios.get<Job[]>("/api/jobs/posted", {
    headers: UserService.authHeader(),
  });
  return response.data;
};

const listUsersUndertookJobs = async () => {
  const response = await axios.get<Job[]>("/api/jobs/undertook", {
    headers: UserService.authHeader(),
  });
  return response.data;
};

const createJob = async ({ hours, location, description }: Job) => {
  const response = await axios.post<any>("/api/jobs", {
    hours,
    location,
    description,
  });
  return response.data;
};

const getJobStatus = async (id: number) => {
  const response = await axios.get<Status>("/api/jobs/status/" + id);
  return response.data;
};

export const JobService = {
  list,
  createJob,
  listUsersPostedJobs,
  listUsersUndertookJobs,
  getJobStatus,
};
