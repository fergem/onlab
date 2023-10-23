import { Avatar, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useAuth } from "../../hooks/react-query/AuthHooks";
import { JobApplicationUserAppliedTo } from "../../models/JobApplication";
import { JobApplicationComment } from "../../models/JobApplicationComment";
import { baseProfilePicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";

interface IMessagebarProps {
  appliedJob: JobApplicationUserAppliedTo;
  selected: boolean;
  select(applicationID: number): void;
}

export default function Messagebar({
  appliedJob,
  selected,
  select,
}: IMessagebarProps) {
  const handleOnClick = () => {
    select(appliedJob.id);
  };
  return (
    <Group
      align="center"
      noWrap
      onClick={handleOnClick}
      sx={(theme) => ({
        backgroundColor: selected ? theme.colors.blue[5] : "white",
        ":hover": {
          backgroundColor: selected
            ? theme.colors.blue[5]
            : theme.colors.blue[2],
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
        <Text fw={1000} fz={10} lineClamp={2}>
          {appliedJob.jobTitle}
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
    <Group position="apart" spacing={0}>
      <Text fw={500} fz={10}>
        {userLastCommentedText}
      </Text>
      <Text fw={500} fz={10}>
        {dayjs(lastComment.commentDate).format("YYYY-MM-DD HH:mm:ss")}
      </Text>
    </Group>
  );
}
