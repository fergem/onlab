import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { JobService } from "../services/JobService";
import Job from "../models/Job";

export const useGetAvailableJobs = (hoursRangeFilter: string) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Job[], Error>(
    "query-jobs",
    async () => {
      const data = JobService.list(hoursRangeFilter);
      return data;
    },
    {
      refetchOnMount: true,
      refetchInterval: 6000,
      refetchOnWindowFocus: true,

      onSuccess: (res) => {
        console.log(res);
        setJobs(res);
      },
      onError: (err) => {
        console.log(err);
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
  const [postPayment, setPostPayment] = useState(0);

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
        hours: postHours,
        location: postLocation,
        description: postDescription,
        payment: postPayment,
      } as Job);
    },
    {
      onSuccess: (res) => {
        setJob(res);
      },
    }
  );
  const setJobData = ({ hours, location, description, payment }: Job) => {
    setPostLocation(location);
    setPostHours(hours);
    setPostDescription(description);
    setPostPayment(payment);
  };
  return [job, error, setJobData, postJob] as const;
};

export const useGetUserPostedJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Job[], Error>(
    "query-jobs",
    async () => {
      const data = JobService.listUsersPostedJobs();
      return data;
    },
    {
      refetchOnMount: true,
      refetchInterval: 6000,
      refetchOnWindowFocus: true,
      //enabled: false,
      onSuccess: (res) => {
        console.log(res);
        setJobs(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return [jobs, error, loading, listJobs] as const;
};

export const useGetUserUnderTookJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Job[], Error>(
    "query-jobs",
    async () => {
      const data = JobService.listUsersUndertookJobs();
      return data;
    },
    {
      refetchOnMount: true,
      refetchInterval: 6000,
      refetchOnWindowFocus: true,
      //enabled: false,
      onSuccess: (res) => {
        setJobs(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return [jobs, error, loading, listJobs] as const;
};
