/* eslint-disable import/prefer-default-export */
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { JobApplication } from "../../models/JobApplication";
import {
  InsertJobApplicationComment,
  JobApplicationComment,
} from "../../models/JobApplicationComment";
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
  applications: JobApplication[]
) => {
  const queryClient = useQueryClient();
  const notifications = useNotification();
  const [connection, setConnection] = useState<HubConnection>();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder().withUrl("/hub").build();

    // Start the connection
    hubConnection
      .start()
      .then(() => {
        notifications.success("Connected to SignalR hub");
        hubConnection.invoke("SubscribeToCommentSection", applicationID);
      })
      .catch((error: Error) => {
        notifications.error(`Error connecting to SignalR hub:${error}`);
      });

    hubConnection.on("CommentAdded", (comment: JobApplicationComment) => {
      console.log("bentbentventsasd");
      console.log(applicationID);
      const asd = queryClient.setQueryData(
        ["query-applications", applicationID],
        {
          ...applications,
          comments: applications
            .find((s) => s.id === applicationID)
            ?.comments?.push(comment),
        }
      );
      console.log(asd);
    });
    hubConnection.on("CommentTyping", () => {
      setTyping(true);
    });
    hubConnection.on("CommentTypingStopped", () => {
      setTyping(false);
    });

    setConnection(hubConnection);
    // Handle cleanup (closing the connection) when the component unmounts
    return () => {
      hubConnection?.off("CommentAdded");
      hubConnection?.off("CommentTyping");
      hubConnection?.off("CommentTypingStopped");
      hubConnection
        .stop()
        .then(() => {
          notifications.success("Disconnected from SignalR hub");
        })
        .catch((error: Error) => {
          notifications.error(`Error disconnecting from SignalR hub:${error}`);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { connection, typing };
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
    async (comment: InsertJobApplicationComment) => {
      return JobApplicationService.insertApplicationCommentForJob(comment);
    },
    {
      onSuccess: () => {
        notifications.success("Successfully commented on job!");
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
            ["query-applications", approvedApplication.id],
            approvedApplication
          );
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );

  return { approveJob };
};
