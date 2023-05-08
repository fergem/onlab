import axios from "axios";
import Job from "../models/Job";
import Status from "../models/Status";

const list = async (hoursRange: string) => {
  const response = await axios.get<Job[]>(`/api/jobs?${hoursRange}`);
  return response.data;
};

const listUsersPostedJobs = async () => {
  const response = await axios.get<Job[]>("/api/jobs/posted");
  return response.data;
};

const listUsersUndertookJobs = async () => {
  const response = await axios.get<Job[]>("/api/jobs/undertook");
  return response.data;
};

const createJob = async ({ hours, location, description, payment }: Job) => {
  const response = await axios.post<any>("/api/jobs", {
    hours,
    location,
    description,
    payment,
  });
  return response.data;
};

const getJobStatus = async (id: number) => {
  const response = await axios.get<Status>("/api/jobs/status/" + id);
  return response.data;
};

const takeJob = async (id: number) => {
  const response = await axios.put<Job>("/api/jobs/takejob/" + id);
  return response.data;
};

export const JobService = {
  list,
  createJob,
  listUsersPostedJobs,
  listUsersUndertookJobs,
  getJobStatus,
  takeJob,
};
