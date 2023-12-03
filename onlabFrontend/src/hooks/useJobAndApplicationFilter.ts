import { useState } from "react";
import { DefaultJobApplicationFilter } from "../models/Filters";
import { Status } from "../models/Job";
import { JobApplicationStatus } from "../models/JobApplication";

export default function useJobAndApplicationFilter() {
  const [filter, setFilter] = useState(DefaultJobApplicationFilter);

  const handleSetJobStatus = (status: string) => {
    setFilter((oldval) => ({ ...oldval, jobStatus: status as Status }));
  };
  const handleSetJobApplicationStatus = (status: string) => {
    setFilter((oldval) => ({
      ...oldval,
      jobApplicationStatus: status as JobApplicationStatus,
    }));
  };

  const handleSetPageNumber = (page: number) => {
    setFilter((prev) => ({ ...prev, pageNumber: page }));
  };

  return {
    filter,
    handleSetJobStatus,
    handleSetPageNumber,
    handleSetJobApplicationStatus,
  };
}
