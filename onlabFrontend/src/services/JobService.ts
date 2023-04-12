import axios from "axios";
import Job from "../models/Job";
import Status from "../models/Status";
import { UserService } from "./UserService";

const list = async () => {
  const response = await axios.get<Job[]>("/api/jobs");
  return response.data;
};

const listUsersJobs = async (username: string) => {
  const response = await axios.get<Job[]>("/api/jobs" + username, {
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
  listUsersJobs,
  getJobStatus,
};
