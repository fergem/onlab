import { JobApplicationFilter } from "../models/Filters";
import {
  AppliedJob,
  CreateJobModel,
  JobDetails,
  JobFilter,
  JobFilterDetails,
  JobPreview,
  PostedJob,
} from "../models/Job";
import { PagedList } from "../models/PagedList";
import apiInstance from "./api";

const get = async (id: string) => {
  const response = await apiInstance.get<JobDetails>(`/jobs/${id}`);
  return response.data;
};

const list = async (filter: JobFilter) => {
  const response = await apiInstance.get<PagedList<JobPreview>>(`/jobs?`, {
    params: filter,
    paramsSerializer: {
      indexes: true,
    },
  });
  return response.data;
};

const listNonRepeatedPostedJobs = async (filter: JobFilterDetails) => {
  const response = await apiInstance.get<PostedJob[]>(`/jobs/posted`, {
    params: { ...filter, repeated: false },
  });
  return response.data;
};

const listRepeatedPostedJobs = async (filter: JobFilterDetails) => {
  const response = await apiInstance.get<PostedJob[]>(`/jobs/posted`, {
    params: { ...filter, repeated: true },
  });
  return response.data;
};

const listAppliedJobs = async (filter: JobApplicationFilter) => {
  const response = await apiInstance.get<AppliedJob[]>("/jobs/applied", {
    params: filter,
  });
  return response.data;
};

const createJob = async (jobModel: CreateJobModel) => {
  const response = await apiInstance.post<JobPreview>("/jobs", jobModel);
  return response.data;
};

const finishJob = async (id: number) => {
  const response = await apiInstance.put<JobDetails>(`/jobs/finishjob/${id}`);
  return response.data;
};
const cancelJob = async (id: number) => {
  const response = await apiInstance.put<JobDetails>(`/jobs/canceljob/${id}`);
  return response.data;
};

const JobService = {
  get,
  list,
  createJob,
  listNonRepeatedPostedJobs,
  listRepeatedPostedJobs,
  listAppliedJobs,

  finishJob,
  cancelJob,
};

export default JobService;
