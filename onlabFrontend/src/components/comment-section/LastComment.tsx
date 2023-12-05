import { Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useUser } from "../../hooks/react-query/AuthHooks";
import { JobApplicationComment } from "../../models/JobApplicationComment";
import { UserPreview } from "../../models/User";

interface ILastCommentProps {
  lastComment: JobApplicationComment;
  appliedUser: UserPreview;
  ownerUser: UserPreview;
}
export default function LastComment({
  lastComment,
  appliedUser,
  ownerUser,
}: ILastCommentProps) {
  const { user } = useUser();

  const ownerName =
    ownerUser.id === user?.id
      ? `You: ${lastComment.commentText}`
      : `${ownerUser.firstName} ${ownerUser.lastName}: ${lastComment.commentText}`;
  const sitterName =
    appliedUser.id === user?.id
      ? `You: ${lastComment.commentText}`
      : `${ownerUser.firstName} ${ownerUser.lastName}: ${lastComment.commentText}`;

  const lastCommenterName =
    lastComment.senderUserID === appliedUser?.id ? sitterName : ownerName;

  return (
    <Stack spacing={0}>
      <Text fw={400} fz={13}>
        {lastCommenterName}
      </Text>
      <Text fw={400} fz={13}>
        {dayjs(lastComment.commentDate).format("YYYY-MM-DD HH:mm:ss")}
      </Text>
    </Stack>
  );
}
