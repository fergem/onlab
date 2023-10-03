import axios from "axios";
import { JobApplication } from "../models/JobApplication";

const getAllForJob = async (jobID: string | undefined) => {
  const response = await axios.get<JobApplication[]>(
    `api/jobapplications/${jobID}`
  );
  return response.data;
};

const insertApplicationForJob = async (jobID: string) => {
  return axios.post<JobApplication>(`api/jobapplications/${jobID}`);
};

const deleteApplication = async (applicationID: number) => {
  return axios.delete(`api/jobapplications/${applicationID}`);
};

const approveApplication = async (applicationID: number) => {
  return axios.patch<JobApplication>(
    `api/jobapplications/${applicationID}/approve`
  );
};

const JobApplicationService = {
  getAllForJob,
  insertApplicationForJob,
  deleteApplication,
  approveApplication,
};

export default JobApplicationService;
