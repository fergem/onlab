import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  CreateJobModel,
  JobDetails,
  JobFilter,
  JobFilterParticipant,
  JobPreview,
} from "../../models/Job";
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
    queryKey: ["query-jobs"],
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
  const [jobs, setJobs] = useState<JobPreview[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
    data,
  } = useQuery({
    queryKey: ["query-jobs"],
    queryFn: async () => {
      return JobService.list(jobParameters);
    },
  });

  useEffect(() => {
    if (data) setJobs(data);
  }, [data]);

  return { jobs, error, loading, listJobs };
};

export const useGetUserPostedJobs = (filter: JobFilterParticipant) => {
  const [jobs, setJobs] = useState<JobPreview[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
    data,
  } = useQuery({
    queryKey: "query-postedJobs",
    queryFn: async () => {
      return JobService.listUsersPostedJobs(filter);
    },
  });

  useEffect(() => {
    if (data) setJobs(data);
  }, [data]);

  return { jobs, error, loading, listJobs };
};

// export const useFinishJob = () => {
//   const queryClient = useQueryClient();
//   const notifications = useNotification();

//   const { mutate: finishJob } = useMutation(
//     "mutate-finishJob",
//     async (id: number) => {
//       if (id !== null) {
//         return JobService.finishJob(id);
//       }
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries({
//           queryKey: ["query-jobs", "query-postedJobs"],
//         });
//       },
//       onError: (error: Error) => {
//         notifications.error(error.message);
//       },
//     }
//   );

//   return { finishJob };
// };

// export const useDeleteJob = () => {
//   const queryClient = useQueryClient();
//   const notifications = useNotification();

//   const { mutate: deleteJob } = useMutation(
//     "mutate-takeJob",
//     async (id: number) => {
//       if (id !== null) {
//         return JobService.deleteJob(id);
//       }
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries({
//           queryKey: ["query-jobs", "query-postedJobs"],
//         });
//       },
//       onError: (error: Error) => notifications.error(error.message),
//     }
//   );

//   return { deleteJob };
// };

// export const useDeclineJob = () => {
//   const queryClient = useQueryClient();
//   const notifications = useNotification();

//   const { mutate: declineJob } = useMutation(
//     "mutate-approveJob",
//     async (id: number | undefined) => {
//       if (id) {
//         return JobService.declineJob(id);
//       }
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries({
//           queryKey: ["query-jobs", "query-postedJobs", "query-approvals"],
//         });
//       },
//       onError: (error: Error) => notifications.error(error.message),
//     }
//   );

//   return { declineJob };
// };

// export const useProgressJob = () => {
//   const { declineJob } = useDeclineJob();
//   const { deleteJob } = useDeleteJob();
//   const { finishJob } = useFinishJob();

//   return { declineJob, finishJob, deleteJob };
// };

export const usePostJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: postJob } = useMutation(
    "mutate-postJob",
    async (jobModel: CreateJobModel) => {
      return JobService.createJob(jobModel);
    },
    {
      onSuccess: (result) => {
        queryClient.setQueriesData(
          ["query-jobs", "query-postedJobs", result.id],
          result
        );
        notifications.success("Successfully posted job!");
      },
      onError: (error: Error) => {
        notifications.error(error.message);
      },
    }
  );
  return { postJob };
};

export const useGetUserUnderTookJobs = (filter: JobFilterParticipant) => {
  const [jobs, setJobs] = useState<JobPreview[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
    data,
  } = useQuery({
    queryKey: "query-undertookJobs",
    queryFn: async () => {
      return JobService.listUsersUndertookJobs(filter);
    },
  });

  useEffect(() => {
    if (data) setJobs(data);
  }, [data]);

  return { jobs, error, loading, listJobs };
};
