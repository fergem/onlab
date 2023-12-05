import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  AppliedJob,
  CreateJobModel,
  JobDetails,
  JobFilter,
  JobFilterPostedAndApplied,
  JobPreview,
  PostedJob,
} from "../../models/Job";
import { PagedList } from "../../models/PagedList";
import JobService from "../../services/JobService";
import useNotification from "../useNotification";

export const useGetJob = (id?: string) => {
  const [job, setJob] = useState<JobDetails>();
  const {
    isLoading,
    refetch: getJob,
    isError,
    data,
  } = useQuery({
    queryKey: ["query-job", id],
    queryFn: async () => {
      if (id) return JobService.get(id);
    },
  });

  useEffect(() => {
    if (data) setJob(data);
  }, [data]);

  return { job, isError, isLoading, getJob };
};

export const useGetJobs = (jobParameters: JobFilter) => {
  const [jobs, setJobs] = useState<PagedList<JobPreview>>();
  const {
    isLoading,
    refetch: refetchJobs,
    isError,
    data,
  } = useQuery({
    queryKey: ["query-jobs", jobParameters],
    queryFn: async () => {
      return JobService.list(jobParameters);
    },
  });

  useEffect(() => {
    if (data) setJobs(data);
  }, [data]);

  return { jobs, isError, isLoading, refetchJobs };
};

export const useGetRepeatedPostedJobs = (filter: JobFilterPostedAndApplied) => {
  const [repeatableJobs, setJobs] = useState<PagedList<PostedJob>>();
  const {
    isLoading: repeatableLoading,
    refetch: refetchRepeatableJobs,
    isError: repeatableError,
    data,
  } = useQuery({
    queryKey: ["query-posted-repeated", filter],
    queryFn: async () => {
      return JobService.listRepeatedPostedJobs(filter);
    },
  });

  useEffect(() => {
    if (data) setJobs(data);
  }, [data]);

  return {
    repeatableJobs,
    repeatableError,
    repeatableLoading,
    refetchRepeatableJobs,
  };
};
export const useGetNonRepeatedPostedJobs = (
  filter: JobFilterPostedAndApplied
) => {
  const [nonRepeatableJobs, setJobs] = useState<PagedList<PostedJob>>();
  const {
    isLoading: nonRepeatedJobsLoading,
    refetch: refetchNonRepeatedJobs,
    isError: isErrorNonRepeatedJobs,
    data,
  } = useQuery({
    queryKey: ["query-posted-nonrepeated", filter],
    queryFn: async () => {
      return JobService.listNonRepeatedPostedJobs(filter);
    },
  });

  useEffect(() => {
    if (data) setJobs(data);
  }, [data]);

  return {
    nonRepeatableJobs,
    isErrorNonRepeatedJobs,
    nonRepeatedJobsLoading,
    refetchNonRepeatedJobs,
  };
};

export const useGetPostedJobs = (filter: JobFilterPostedAndApplied) => {
  const [postedJobs, setPostedJobs] = useState<PagedList<PostedJob>>();
  const {
    isLoading: isLoadingPostedJobs,
    refetch: refetchPostedJobs,
    isError: isErrorPosted,
    data,
  } = useQuery({
    queryKey: ["query-posted-messages", filter],
    queryFn: async () => {
      return JobService.listPostedJobs(filter);
    },
  });

  useEffect(() => {
    if (data) setPostedJobs(data);
  }, [data]);

  return {
    postedJobs,
    isLoadingPostedJobs,
    isErrorPosted,
    refetchPostedJobs,
  };
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
        queryClient.invalidateQueries("query-posted-repeated");
        queryClient.invalidateQueries("query-posted-nonrepeated");
        notifications.success("Successfully finished job!");
      },
      onError: (error: AxiosError) => {
        notifications.error(error.response?.data as string);
      },
    }
  );

  return { finishJob };
};

export const useCancelJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: cancelJob } = useMutation(
    "mutate-cancelJob",
    async (id: number | undefined) => {
      if (id) {
        return JobService.cancelJob(id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("query-posted-repeated");
        queryClient.invalidateQueries("query-posted-nonrepeated");
        notifications.success("Successfully canceled job!");
      },
      onError: (error: AxiosError) => {
        notifications.error(error.response?.data as string);
      },
    }
  );

  return { cancelJob };
};

export const usePostJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();
  const navigate = useNavigate();

  const { mutate: postJob } = useMutation(
    "mutate-postJob",
    async (jobModel: CreateJobModel) => {
      return JobService.createJob(jobModel);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("query-posted-repeated");
        queryClient.invalidateQueries("query-posted-nonrepeated");
        navigate("/postedjobs");
        notifications.success("Successfully posted job!");
      },
      onError: (error: AxiosError) => {
        notifications.error(error.response?.data as string);
      },
    }
  );
  return { postJob };
};

export const useGetAppliedJobs = (
  filter: JobFilterPostedAndApplied,
  key: string
) => {
  const [jobs, setJobs] = useState<PagedList<AppliedJob>>();
  const {
    isLoading,
    refetch: refetchJobs,
    isError,
    data,
  } = useQuery({
    queryKey: [`query-appliedJobs-${key}`, filter],
    queryFn: async () => {
      return JobService.listAppliedJobs(filter);
    },
  });

  useEffect(() => {
    if (data) setJobs(data);
  }, [data]);

  return { jobs, isError, isLoading, refetchJobs };
};
