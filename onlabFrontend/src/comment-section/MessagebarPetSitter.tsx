import { Avatar, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useAuth } from "../hooks/react-query/AuthHooks";
import { AppliedJob } from "../models/Job";
import { JobApplicationComment } from "../models/JobApplicationComment";
import { baseProfilePicture } from "../utility/constants";
import { ImageFunctions } from "../utility/image";

interface IMessagebarProps {
  appliedJob: AppliedJob;
  select(applicationID: number): void;
}

export default function MessagebarPetSitter({
  appliedJob,
  select,
}: IMessagebarProps) {
  const handleOnClick = () => {
    select(appliedJob.id);
  };
  const lastMessage =
    appliedJob.jobApplication.comments &&
    appliedJob.jobApplication?.comments.slice(-1)[0];
  return (
    <Group
      align="center"
      noWrap
      onClick={handleOnClick}
      sx={(theme) => ({
        "&:hover": {
          color: "white",
          backgroundColor: theme.colors.blue[6],
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
        <Text fw={500} fz={12} lineClamp={2}>
          {appliedJob.title}
        </Text>

        <LastComment
          lastComment={lastMessage}
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
