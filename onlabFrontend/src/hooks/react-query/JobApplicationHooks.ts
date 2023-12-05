/* eslint-disable import/prefer-default-export */
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { JobApplication } from "../../models/JobApplication";
import { InsertJobApplicationCommentModel } from "../../models/JobApplicationComment";
import JobApplicationService from "../../services/JobApplicationService";
import useNotification from "../useNotification";

export const useGetApplicationsForJob = (jobID: string | undefined) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const {
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
    refetch: refetchApplications,
    data,
  } = useQuery({
    queryKey: ["query-applications"],
    queryFn: async () => {
      if (jobID) return JobApplicationService.getAllForJob(jobID);
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setApplications(data);
    }
  }, [data]);

  return {
    isLoadingApplications,
    isErrorApplications,
    applications,
    refetchApplications,
  };
};

export const useJobApplicationCommentHub = (
  applicationID: number,
  handleCommentUpdate: () => void
) => {
  const notifications = useNotification();
  const [connection, setConnection] = useState<HubConnection>();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder().withUrl("/hub").build();
    hubConnection
      .start()
      .then(() => {
        hubConnection.invoke("SubscribeToCommentSection", applicationID);
      })
      .catch((error: Error) => {
        notifications.error(`Error connecting to SignalR hub:${error}`);
      });

    hubConnection.on("CommentAdded", () => {
      handleCommentUpdate();
    });
    hubConnection.on("CommentTyping", () => {
      setTyping(true);
    });
    hubConnection.on("CommentTypingStopped", () => {
      setTyping(false);
    });
    setConnection(hubConnection);

    return () => {
      hubConnection?.off("CommentAdded");
      hubConnection?.off("CommentTyping");
      hubConnection?.off("CommentTypingStopped");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInvokeTyping = () => {
    connection?.invoke("Typing", applicationID);
  };
  const handleInvokeNotTyping = () => {
    connection?.invoke("TypingStopped", applicationID);
  };

  return { connection, handleInvokeTyping, handleInvokeNotTyping, typing };
};

export const useApplyToJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: applyToJob } = useMutation(
    "mutate-applyToJob",
    async (id: number) => {
      if (id) {
        return JobApplicationService.insertApplicationForJob(id);
      }
    },
    {
      onSuccess: (newAppliction) => {
        if (newAppliction) {
          queryClient.invalidateQueries("query-applications");
        }
      },
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
    }
  );

  return { applyToJob };
};

export const usePostComment = () => {
  const notifications = useNotification();
  const { mutate: commentOnJob } = useMutation(
    "mutate-postJob",
    async (comment: InsertJobApplicationCommentModel) => {
      return JobApplicationService.insertApplicationCommentForJob(comment);
    },
    {
      onError: (error: AxiosError) => {
        notifications.error(error.response?.data as string);
      },
    }
  );
  return { commentOnJob };
};

export const useApproveApplicationForJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: approveApplication } = useMutation(
    "mutate-approveApplication",
    async (applicationID: number) => {
      if (applicationID) {
        return JobApplicationService.approveApplication(applicationID);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("query-posted-nonrepeated");
        queryClient.invalidateQueries("query-posted-repeated");
      },
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
    }
  );
  return { approveApplication };
};

export const useCancelApplicationForJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: cancelApplication } = useMutation(
    "mutate-cancelApplication",
    async (applicationID: number) => {
      if (applicationID) {
        return JobApplicationService.cancelApplication(applicationID);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("query-posted-nonrepeated");
        queryClient.invalidateQueries("query-posted-repeated");
        queryClient.invalidateQueries("query-appliedJobs-display");
        notifications.success("Succesfully removed application");
      },
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
    }
  );
  return { cancelApplication };
};
