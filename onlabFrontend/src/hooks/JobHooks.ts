import { JobParameters, JobWithPetIDs } from "./../models/Job";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { JobService } from "../services/JobService";
import Job from "../models/Job";
import { useToast } from "@chakra-ui/toast";

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
      refetchOnMount: true,
      refetchInterval: 6000,
      refetchOnWindowFocus: true,

      onSuccess: (res) => {
        setJobs(res);
      },
      onError: (err) => {},
    }
  );

  return [jobs, error, loading, listJobs] as const;
};

export const useGetApprovals = () => {
  const [approvals, setApprovals] = useState<Job[]>([]);
  const {
    isLoading: loading,
    refetch: listApprovals,
    isError: error,
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

  return [approvals, error, loading, listApprovals] as const;
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

  return [jobs, error, loading, listJobs] as const;
};

const fortmatResponse = (res: any) => {
  return JSON.stringify(res, null, 2);
};

export const useTakeJob = () => {
  const { mutate: takeJob } = useMutation<any, Error, number>(
    "mutate-takeJob",
    async (id: number) => {
      if (id) {
        return await JobService.takeJob(id);
      }
    }
  );

  return [takeJob] as const;
};

export const useApproveJob = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isApproveingJob,
    mutate: approveJob,
    isError: error,
  } = useMutation<any, Error, number>(
    "mutate-approveJob",
    async (id: number) => {
      if (id !== null) {
        const asd = await JobService.approveJob(id);
        return asd;
      }
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("query-approvals");
      },
      onError: (err: any) => {},
    }
  );

  return [approveJob, isApproveingJob, error] as const;
};

export const useDeclineJob = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: isDecliningJob,
    mutate: declineJob,
    isError: error,
  } = useMutation<any, Error, number>(
    "mutate-approveJob",
    async (id: number) => {
      if (id !== null) {
        const asd = await JobService.declineJob(id);
        return asd;
      }
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("query-approvals");
      },
      onError: (err: any) => {},
    }
  );

  return [declineJob, isDecliningJob, error] as const;
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
      return await JobService.createJob({
        hours: hours,
        location: location,
        description: description,
        payment: payment,
        minRequiredExperience: minRequiredExperience,
        petIDs: petIDs,
      } as JobWithPetIDs);
    },
    {
      onSuccess: (res) => {
        setJob(res);
      },
    }
  );
  return [job, error, postJob] as const;
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

  return [jobs, error, loading, listJobs] as const;
};
