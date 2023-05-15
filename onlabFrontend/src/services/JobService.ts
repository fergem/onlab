import { JobParameters } from "./../models/Job";
import axios from "axios";
import Job from "../models/Job";
import Status from "../models/Status";

const list = async (jobParameters: JobParameters) => {
  const response = await axios.get<Job[]>(
    `/api/jobs?minhours=${jobParameters.jobHoursRange.minHours}&maxhours=${jobParameters.jobHoursRange.maxHours}&jobstatus=${jobParameters.statusName}`
  );
  return response.data;
};

const listUsersPostedJobs = async (jobParameters: JobParameters) => {
  const response = await axios.get<Job[]>(
    `/api/jobs/posted?minhours=${jobParameters.jobHoursRange.minHours}&maxhours=${jobParameters.jobHoursRange.maxHours}&jobstatus=${jobParameters.statusName}`
  );
  return response.data;
};

const listUsersUndertookJobs = async () => {
  const response = await axios.get<Job[]>("/api/jobs/undertook");
  return response.data;
};

const createJob = async ({ hours, location, description, payment }: Job) => {
  console.log({ hours, location, description, payment });
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

const approveJob = async (id: number) => {
  const response = await axios.put<Job>("/api/jobs/approvejob" + id);
  return response.data;
};

const declineUser = async (id: number) => {
  const response = await axios.put<Job>("/api/jobs/declineUser" + id);
  return response.data;
};

export const JobService = {
  list,
  createJob,
  listUsersPostedJobs,
  listUsersUndertookJobs,
  getJobStatus,
  takeJob,
  approveJob,
  declineUser,
};
