import { Button, Text } from "@mantine/core";
import { useState } from "react";
import {
  useJobApplicationCommentHub,
  usePostComment,
} from "../../hooks/react-query/JobApplicationHooks";
import { JobApplication } from "../../models/JobApplication";

export interface IJobCommentSectionProps {
  applicationID: number;
  applications: JobApplication[];
}

export default function JobCommentSectionOwner({
  applicationID,
  applications,
}: IJobCommentSectionProps) {
  const [message, setMessage] = useState<string>("");

  const { connection, typing } = useJobApplicationCommentHub(
    applicationID,
    applications
  );
  const { commentOnJob } = usePostComment();
  return (
    <>
      <Button
        onClick={() =>
          commentOnJob({
            applicationID,
            message: "asdasdasdasdasdasdasdsa",
          })
        }
      >
        Click me for message
      </Button>
      <Text fz={30}>Message: {message}</Text>
    </>
  );
}
