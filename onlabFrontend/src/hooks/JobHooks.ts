import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Job, { JobParameters, JobWithPetIDs } from "../models/Job";
import JobService from "../services/JobService";
import useNotification from "./useNotification";

export const useGetJob = (id?: string) => {
  const [job, setJobs] = useState<Job>();
  const {
    isLoading: loading,
    refetch: getJob,
    isError: error,
  } = useQuery<Job, Error>(
    "query-jobs",
    async () => {
      return JobService.get(id);
    },
    {
      onSuccess: (res) => {
        setJobs(res);
      },
    }
  );

  return { job, error, loading, getJob };
};

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
      onSuccess: (res) => {
        setJobs(res);
      },
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
    }
  );

  return {
    approvals,
    approvalsLoading,
    approvalsError,
    listApprovals,
  };
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
    }
  );

  return { jobs, error, loading, listJobs };
};

export const useTakeJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();
  const { mutate: takeJob } = useMutation(
    "mutate-takeJob",
    async (id: number) => {
      if (id !== null) {
        return JobService.takeJob(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["query-jobs", "query-postedJobs"],
        });
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );

  return { takeJob };
};

export const useFinishJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: finishJob } = useMutation(
    "mutate-finishJob",
    async (id: number) => {
      if (id !== null) {
        return JobService.finishJob(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["query-jobs", "query-postedJobs"],
        });
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );

  return { finishJob };
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: deleteJob } = useMutation(
    "mutate-takeJob",
    async (id: number) => {
      if (id !== null) {
        return JobService.deleteJob(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["query-jobs", "query-postedJobs"],
        });
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );

  return { deleteJob };
};

export const useApproveJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: approveJob } = useMutation(
    "mutate-approveJob",
    async (id: number) => {
      if (id) {
        return JobService.approveJob(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("query-approvals");
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );

  return { approveJob };
};

export const useDeclineJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: declineJob } = useMutation(
    "mutate-approveJob",
    async (id: number | undefined) => {
      if (id) {
        return JobService.declineJob(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["query-jobs", "query-postedJobs", "query-approvals"],
        });
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );

  return { declineJob };
};

export const useProgressJob = () => {
  const { declineJob } = useDeclineJob();
  const { approveJob } = useApproveJob();
  const { deleteJob } = useDeleteJob();
  const { finishJob } = useFinishJob();
  const { takeJob } = useTakeJob();

  return { takeJob, approveJob, declineJob, finishJob, deleteJob };
};

export const usePostJobs = () => {
  const [job, setJob] = useState<Job>();
  const { mutate: postJob, isError: error } = useMutation(
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
    }
  );

  return { jobs, error, loading, listJobs };
};
