import axios from "axios";
import { JobApplication } from "../models/JobApplication";
import { InsertJobApplicationComment } from "../models/JobApplicationComment";

const getAllForJob = async (jobID: string | undefined) => {
  const response = await axios.get<JobApplication[]>(
    `api/jobapplications/${jobID}`
  );
  return response.data;
};

const insertApplicationForJob = async (jobID: number) => {
  const response = await axios.post<JobApplication>(
    `api/jobapplications/${jobID}`
  );
  return response.data;
};

const insertApplicationCommentForJob = async (
  model: InsertJobApplicationComment
) => {
  console.log("bent", model);
  const response = await axios.post<JobApplication>(
    `api/jobapplications/comment`,
    model
  );
  return response.data;
};

const deleteApplication = async (applicationID: number) => {
  const response = await axios.delete(`api/jobapplications/${applicationID}`);
  return response.data;
};

const approveApplication = async (applicationID: number) => {
  const response = await axios.patch<JobApplication>(
    `api/jobapplications/${applicationID}/approve`
  );
  return response.data;
};

const JobApplicationService = {
  getAllForJob,
  insertApplicationForJob,
  insertApplicationCommentForJob,
  deleteApplication,
  approveApplication,
};

export default JobApplicationService;
