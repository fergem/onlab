import { useState, useEffect } from "react";
import { isError, useMutation, useQuery, useQueryClient } from "react-query";
import { JobService } from "../services/JobService";
import Job from "../models/Job";

export const useGetAvailableJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Job[], Error>(
    "query-jobs",
    async () => {
      const data = await JobService.list();
      return data;
    },
    {
      //enabled: false,
      onSuccess: (res) => {
        console.log("shiker jobok leszedése");
        setJobs(res);
      },
    }
  );
  return [jobs, error, loading, listJobs] as const;
};

export const usePostJobs = () => {
  const [job, setJob] = useState<Job>();
  const [postLocation, setPostLocation] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postHours, setPostHours] = useState(0);

  //const [postResult, setPostResult] = useState<string | null>(null);
  //esetleg error kidobása??
  const {
    isLoading: isPostingJob,
    mutate: postJob,
    isError: error,
  } = useMutation<any, Error>(
    "query-jobs",
    async () => {
      return await JobService.createJob({
        location: postLocation,
        description: postDescription,
        hours: postHours,
        ownerUser: null, //ez a user
        appliedUser: null,
        status: {
          id: 1,
          name: "Available",
        },
      });
    },
    {
      onSuccess: (res) => {
        setJob(res);
        console.log(job);
      },
    }
  );
  const setJobData = ({ hours, location, description }: Job) => {
    setPostLocation(location);
    setPostHours(hours);
    setPostDescription(description);
  };
  return [job, setJobData, postJob] as const;
};

export const useGetUserPostedJobs = (ID: number) => {};

export const useGetUserUnderTookJobs = (ID: number) => {};
