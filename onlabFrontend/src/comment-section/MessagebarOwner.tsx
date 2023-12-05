import { Avatar, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useUser } from "../hooks/react-query/AuthHooks";
import { JobApplication } from "../models/JobApplication";
import { JobApplicationComment } from "../models/JobApplicationComment";
import { User, UserDetails } from "../models/User";
import { baseProfilePicture } from "../utility/constants";
import { ImageFunctions } from "../utility/image";

interface IMessagebarProps {
  jobApplication: JobApplication;
  select(applicationID: number): void;
}

export default function MessagebarOwner({
  jobApplication,
  select,
}: IMessagebarProps) {
  const { user } = useUser();
  const handleOnClick = () => {
    select(jobApplication.id);
  };
  const lastMessage =
    jobApplication.comments && jobApplication?.comments.slice(-1)[0];
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
        src={ImageFunctions.toDisplayImage(baseProfilePicture, user?.picture)}
        size="lg"
        radius="lg"
      />
      <Stack spacing={0}>
        <LastCommentOwner
          lastComment={lastMessage}
          user={user}
          senderUser={jobApplication.applicantUser}
        />
      </Stack>
    </Group>
  );
}

interface ILastCommentProps {
  lastComment?: JobApplicationComment;
  user: User | null;
  senderUser: UserDetails;
}
function LastCommentOwner({
  lastComment,
  user,
  senderUser,
}: ILastCommentProps) {
  if (!lastComment) return <div />;
  const isUserLastCommented = lastComment.senderUserID === user?.id;
  const userLastCommentedText = isUserLastCommented
    ? `You: ${lastComment.commentText}`
    : `${senderUser.firstName ?? "no username"} ${senderUser.lastName}: ${
        lastComment.commentText
      }`;
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
