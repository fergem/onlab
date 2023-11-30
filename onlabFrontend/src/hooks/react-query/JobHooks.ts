import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { JobApplicationFilter } from "../../models/Filters";
import {
  AppliedJob,
  CreateJobModel,
  JobDetails,
  JobFilter,
  JobFilterDetails,
  JobPreview,
  PostedJob,
} from "../../models/Job";
import { PagedList } from "../../models/PagedList";
import JobService from "../../services/JobService";
import useNotification from "../useNotification";

export const useGetJob = (id?: string) => {
  const [job, setJob] = useState<JobDetails>();
  const {
    isLoading: loading,
    refetch: getJob,
    isError: error,
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

  return { job, error, loading, getJob };
};

export const useGetJobs = (jobParameters: JobFilter) => {
  const [jobs, setJobs] = useState<PagedList<JobPreview>>();
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
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

  return { jobs, error, loading, listJobs };
};

export const useGetRepeatedPostedJobs = (filter: JobFilterDetails) => {
  const [repeatableJobs, setJobs] = useState<PostedJob[]>([]);
  const {
    isLoading: repeatableLoading,
    refetch: listRepeatableJobs,
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
    listRepeatableJobs,
  };
};
export const useGetNonRepeatedPostedJobs = (filter: JobFilterDetails) => {
  const [nonRepeatableJobs, setJobs] = useState<PostedJob[]>([]);
  const {
    isLoading: nonRepeatedJobsLoading,
    refetch: listNonRepeatedJobs,
    isError: errorNonRepeatedJobs,
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
    errorNonRepeatedJobs,
    nonRepeatedJobsLoading,
    listNonRepeatedJobs,
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

export const useGetUserApliedJobs = (filter: JobApplicationFilter) => {
  const [jobs, setJobs] = useState<AppliedJob[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
    data,
  } = useQuery({
    queryKey: ["query-appliedJobs", filter],
    queryFn: async () => {
      return JobService.listAppliedJobs(filter);
    },
  });

  useEffect(() => {
    if (data) setJobs(data);
  }, [data]);

  return { jobs, error, loading, listJobs };
};
