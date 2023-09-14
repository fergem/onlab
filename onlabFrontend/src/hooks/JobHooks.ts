import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Job, { JobParameters, JobWithPetIDs } from "../models/Job";
import JobService from "../services/JobService";

export const useGetJobs = (jobParameters: JobParameters) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Job[], Error>(
    "query-jobs",
    async () => {
      const data = JobService.list(jobParameters);
      return data;
    },
    {
      retry: false,
      refetchOnMount: true,
      refetchInterval: 6000,
      refetchOnWindowFocus: true,

      onSuccess: (res) => {
        setJobs(res);
      },
      onError: (err) => {},
    }
  );

  return { jobs, error, loading, listJobs };
};

export const useGetApprovals = () => {
  const [approvals, setApprovals] = useState<Job[]>([]);
  const {
    isLoading: approvalsLoading,
    refetch: listApprovals,
    isError: approvalsError,
  } = useQuery<Job[], Error>(
    "query-approvals",
    async () => {
      const data = JobService.listApprovals();
      return data;
    },
    {
      refetchOnMount: true,
      refetchInterval: 6000,
      refetchOnWindowFocus: true,

      onSuccess: (res) => {
        setApprovals(res);
      },
      onError: (err) => {},
    }
  );

  return {
    approvals,
    approvalsLoading,
    approvalsError,
    listApprovals,
  } as const;
};

export const useGetUserPostedJobs = (jobParameters: JobParameters) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Job[], Error>(
    "query-postedJobs",
    async () => {
      const data = JobService.listUsersPostedJobs(jobParameters);
      return data;
    },
    {
      refetchOnMount: true,
      refetchInterval: 6000,
      refetchOnWindowFocus: true,

      onSuccess: (res) => {
        setJobs(res);
      },
      onError: (err) => {},
    }
  );

  return { jobs, error, loading, listJobs } as const;
};

const fortmatResponse = (res: any) => {
  return JSON.stringify(res, null, 2);
};

export const useTakeJob = () => {
  const [putResult, setPutResult] = useState<string | null>(null);
  const {
    isLoading: isTakingJob,
    mutate: takeJob,
    isError: error,
  } = useMutation<any, Error, number>(
    "mutate-takeJob",
    async (id: number) => {
      if (id !== null) {
        const asd = await JobService.takeJob(id);
        return asd;
      }
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {},
    }
  );

  return { takeJob, isTakingJob, error } as const;
};

export const useApproveJob = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isApproveingJob,
    mutate: approveJob,
    isError: error,
  } = useMutation<any, Error, number | undefined>(
    "mutate-approveJob",
    async (id: number | undefined) => {
      if (id) {
        return JobService.approveJob(id);
      }
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("query-approvals");
      },
      onError: (err: any) => {},
    }
  );

  return { approveJob, isApproveingJob, error };
};

export const useDeclineJob = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isDecliningJob,
    mutate: declineJob,
    isError: error,
  } = useMutation<any, Error, number | undefined>(
    "mutate-approveJob",
    async (id: number | undefined) => {
      if (id) {
        return JobService.declineJob(id);
      }
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("query-approvals");
      },
      onError: (err: any) => {},
    }
  );

  return { declineJob, isDecliningJob, error };
};

export const usePostJobs = () => {
  const [job, setJob] = useState<JobWithPetIDs>();
  const {
    isLoading: isPostingJob,
    mutate: postJob,
    isError: error,
  } = useMutation<any, Error, JobWithPetIDs>(
    "mutate-postJob",
    async ({
      hours,
      location,
      description,
      payment,
      minRequiredExperience,
      petIDs,
    }: JobWithPetIDs) => {
      return JobService.createJob({
        hours,
        location,
        description,
        payment,
        minRequiredExperience,
        petIDs,
      } as JobWithPetIDs);
    },
    {
      onSuccess: (res) => {
        setJob(res);
      },
    }
  );
  return { job, error, postJob };
};

export const useGetUserUnderTookJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Job[], Error>(
    "query-undertookJobs",
    async () => {
      const data = JobService.listUsersUndertookJobs();
      return data;
    },
    {
      refetchOnMount: true,
      refetchInterval: 6000,
      refetchOnWindowFocus: true,

      onSuccess: (res) => {
        setJobs(res);
      },
      onError: (err) => {},
    }
  );

  return { jobs, error, loading, listJobs };
};
