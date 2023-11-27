import { Avatar, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useAuth } from "../../hooks/react-query/AuthHooks";
import { JobApplicationChat } from "../../models/JobApplication";
import { JobApplicationComment } from "../../models/JobApplicationComment";
import { baseProfilePicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";

interface IMessagebarProps {
  appliedJob: JobApplicationChat;
  select(applicationID: number): void;
}

export default function Messagebar({ appliedJob, select }: IMessagebarProps) {
  const handleOnClick = () => {
    select(appliedJob.id);
  };
  return (
    <Group
      align="center"
      noWrap
      onClick={handleOnClick}
      sx={(theme) => ({
        ":hover": {
          backgroundColor: theme.colors.blue[4],
        },
        borderRadius: "10px",
      })}
      px="sm"
      py="sm"
    >
      <Avatar
        src={ImageFunctions.toDisplayImage(
          baseProfilePicture,
          appliedJob.ownerUser.picture
        )}
        size="lg"
        radius="lg"
      />
      <Stack spacing={0}>
        <Text fw={1000} fz={17} lineClamp={2}>
          {`${appliedJob.jobTitle} (${appliedJob.ownerUser.firstName} ${appliedJob.ownerUser.lastName})`}
        </Text>
        <LastComment
          lastComment={
            appliedJob.comments ? appliedJob.comments.at(0) : undefined
          }
          ownerUserName={`${appliedJob.ownerUser?.firstName} ${appliedJob.ownerUser?.lastName}`}
        />
      </Stack>
    </Group>
  );
}

interface ILastCommentProps {
  lastComment?: JobApplicationComment;
  ownerUserName: string;
}
function LastComment({ lastComment, ownerUserName }: ILastCommentProps) {
  const { user } = useAuth();

  if (!lastComment) return <div />;
  const isUserLastCommented = lastComment.senderUserID === user?.id;
  const userLastCommentedText = isUserLastCommented
    ? `You: ${lastComment.commentText}`
    : `${ownerUserName}: ${lastComment.commentText}`;
  return (
    <Stack spacing={0}>
      <Text fw={500} fz={13}>
        {userLastCommentedText}
      </Text>
      <Text fw={500} fz={13}>
        {dayjs(lastComment.commentDate).format("YYYY-MM-DD HH:mm:ss")}
      </Text>
    </Stack>
  );
}
