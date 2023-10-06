/* eslint-disable import/prefer-default-export */
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { JobApplication } from "../../models/JobApplication";
import { InsertJobApplicationCommentModel } from "../../models/JobApplicationComment";
import JobApplicationService from "../../services/JobApplicationService";
import useNotification from "../useNotification";

export const useGetApplicationsForJob = (jobID: string | undefined) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const {
    isLoading: loadingApplications,
    isError: errorApplications,
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
    loadingApplications,
    errorApplications,
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
        console.log("Connected to SignalR hub");
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
        if (newAppliction)
          queryClient.setQueryData(
            ["query-applications", newAppliction.id],
            newAppliction
          );
      },
      onError: (error: Error) => notifications.error(error.message),
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
      onSuccess: () => {
        // notifications.success("Successfully commented on job!");
      },
      onError: (error: Error) => {
        notifications.error(error.message);
      },
    }
  );
  return { commentOnJob };
};

export const useApproveApplicationForJob = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: approveJob } = useMutation(
    "mutate-approveJob",
    async (applicationID: number) => {
      if (applicationID) {
        return JobApplicationService.approveApplication(applicationID);
      }
    },
    {
      onSuccess: (approvedApplication) => {
        if (approvedApplication)
          queryClient.setQueryData(
            ["query-applications", { id: approvedApplication.id }],
            approvedApplication
          );
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );

  return { approveJob };
};
