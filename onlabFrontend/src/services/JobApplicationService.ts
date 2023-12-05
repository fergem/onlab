import { JobApplication } from "../models/JobApplication";
import { InsertJobApplicationCommentModel } from "../models/JobApplicationComment";
import apiInstance from "./api";

const getAllForJob = async (jobID: string | undefined) => {
  const response = await apiInstance.get<JobApplication[]>(
    `/jobapplications/${jobID}`
  );
  return response.data;
};

const insertApplicationForJob = async (jobID: number) => {
  const response = await apiInstance.post<JobApplication>(
    `/jobapplications/${jobID}`
  );
  return response.data;
};

const insertApplicationCommentForJob = async (
  model: InsertJobApplicationCommentModel
) => {
  const response = await apiInstance.post<JobApplication>(
    `/jobapplications/comment`,
    model
  );
  return response.data;
};

const cancelApplication = async (applicationID: number) => {
  const response = await apiInstance.patch(
    `/jobapplications/${applicationID}/cancel`
  );
  return response.data;
};

const approveApplication = async (applicationID: number) => {
  const response = await apiInstance.patch<JobApplication>(
    `/jobapplications/${applicationID}/approve`
  );
  return response.data;
};

const JobApplicationService = {
  getAllForJob,
  insertApplicationForJob,
  insertApplicationCommentForJob,
  cancelApplication,
  approveApplication,
};

export default JobApplicationService;
