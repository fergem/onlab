import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Job, {
  CreateJobModel,
  JobFilter,
  JobFilterParticipant,
} from "../models/Job";
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

export const useGetJobs = (jobParameters: JobFilter) => {
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

export const useGetUserPostedJobs = (filter: JobFilterParticipant) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Job[], Error>(
    "query-postedJobs",
    async () => {
      const data = JobService.listUsersPostedJobs(filter);
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
  const queryClient = useQueryClient();
  const { mutate: postJob } = useMutation(
    "mutate-postJob",
    async (jobModel: CreateJobModel) => {
      return JobService.createJob(jobModel);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["query-jobs", "query-postedJobs", "query-approvals"],
        });
      },
    }
  );
  return { postJob };
};

export const useGetUserUnderTookJobs = (filter: JobFilterParticipant) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Job[], Error>(
    "query-undertookJobs",
    async () => {
      const data = JobService.listUsersUndertookJobs(filter);
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
