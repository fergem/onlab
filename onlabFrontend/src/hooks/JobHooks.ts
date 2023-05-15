import { JobParameters } from "./../models/Job";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
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
  const [putResult, setPutResult] = useState<string | null>(null);
  const toast = useToast({ duration: 5000, isClosable: true });
  const {
    isLoading: isTakingJob,
    mutate: takeJob,
    isError: error,
  } = useMutation<any, Error, number>(
    "mutate-takeJob",
    async (id: number) => {
      console.log("asd", id);
      if (id !== null) {
        console.log("asdasd");

        const asd = await JobService.takeJob(id);
        console.log("asdasd", asd);
        return asd;
      }
    },
    {
      onSuccess: (res) => {
        toast({
          title: "Job taken",
          description: `You have taken the job`,
          status: "success",
        });
      },
      onError: (err: any) => {
        const desc = fortmatResponse(err.response?.data || err);
        toast({
          title: "Job not taken",
          description: err.response.data,
          status: "error",
        });
      },
    }
  );

  return [takeJob, isTakingJob, error] as const;
};

export const useApproveJob = () => {
  //const toast = useToast({ duration: 5000, isClosable: true });
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
      onSuccess: (res) => {},
      onError: (err: any) => {},
    }
  );

  return [approveJob, isApproveingJob, error] as const;
};

export const useDeclineJob = () => {
  //const toast = useToast({ duration: 5000, isClosable: true });
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
      onSuccess: (res) => {},
      onError: (err: any) => {},
    }
  );

  return [declineJob, isDecliningJob, error] as const;
};

export const usePostJobs = () => {
  const [job, setJob] = useState<Job>();
  const {
    isLoading: isPostingJob,
    mutate: postJob,
    isError: error,
  } = useMutation<any, Error, Job>(
    "mutate-postJob",
    async ({ hours, location, description, payment }: Job) => {
      return await JobService.createJob({
        hours: hours,
        location: location,
        description: description,
        payment: payment,
      } as Job);
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
