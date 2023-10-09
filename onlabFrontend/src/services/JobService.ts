import {
  CreateJobModel,
  JobDetails,
  JobFilter,
  JobFilterParticipant,
  JobPreview,
} from "../models/Job";
import apiInstance from "./api";

const get = async (id: string) => {
  const response = await apiInstance.get<JobDetails>(`/jobs/${id}`);
  return response.data;
};

const list = async (filter: JobFilter) => {
  const response = await apiInstance.get<JobPreview[]>(`/jobs?`, {
    params: filter,
    paramsSerializer: {
      indexes: true,
    },
  });
  return response.data;
};

const listUsersPostedJobs = async (filter: JobFilterParticipant) => {
  const response = await apiInstance.get<JobPreview[]>(`/jobs/posted?`, {
    params: filter,
  });
  return response.data;
};

const listUsersUndertookJobs = async (filter: JobFilterParticipant) => {
  const response = await apiInstance.get<JobPreview[]>("/jobs/undertook", {
    params: filter,
  });
  return response.data;
};

// const listApprovals = async () => {
//   const response = await axios.get<Job[]>("/api/jobs/approvals");
//   return response.data;
// };

const createJob = async (jobModel: CreateJobModel) => {
  const response = await apiInstance.post<JobPreview>("/jobs", jobModel);
  return response.data;
};

// const takeJob = async (id: number) => {
//   const response = await axios.put<Job>(`/api/jobs/takejob/${id}`);
//   return response.data;
// };

// const approveJob = async (id: number) => {
//   const response = await axios.put<Job>(`/api/jobs/approvejob/${id}`);
//   return response.data;
// };

// const declineJob = async (id: number) => {
//   const response = await axios.put<Job>(`/api/jobs/declineUser/${id}`);
//   return response.data;
// };

// const finishJob = async (id: number) => {
//   const response = await axios.put<Job>(`/api/jobs/finishjob/${id}`);
//   return response.data;
// };
// const deleteJob = async (id: number) => {
//   const response = await axios.delete<Job>(`/api/jobs/deletejob/${id}`);
//   return response.data;
// };

const JobService = {
  get,
  list,
  createJob,
  listUsersPostedJobs,
  listUsersUndertookJobs,
  // takeJob,
  // approveJob,
  // declineJob,
  // listApprovals,
  // finishJob,
  // deleteJob,
};

export default JobService;
