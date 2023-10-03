/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { JobApplication } from "../models/JobApplication";
import JobApplicationService from "../services/JobApplicationService";

export const useGetApplicationsForJob = (jobID: string | undefined) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const {
    isLoading: loadingApplications,
    isError: errorApplications,
    refetch: refetchApplications,
    data,
  } = useQuery({
    queryKey: ["query-applications"],
    queryFn: async () => {
      if (jobID) return JobApplicationService.getAllForJob(jobID);
    },
  });

  useEffect(() => {
    if (data) {
      setApplications(data);
    }
  }, [data]);

  return {
    loadingApplications,
    errorApplications,
    applications,
    refetchApplications,
  };
};
