import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";
import { useUser } from "../../../hooks/react-query/AuthHooks";
import { JobApplicationComment } from "../../../models/JobApplicationComment";
import { baseProfilePicture } from "../../../utility/constants";

export interface IPropsMessageBubble {
  comment: JobApplicationComment;
  picture?: string;
}

export default function MessageBubble({
  comment,
  picture,
}: IPropsMessageBubble) {
  const { user } = useUser();
  const isUser = comment.senderUserID === user?.id;
  return (
    <Stack align={!isUser ? "flex-start" : "flex-end"}>
      <Badge
        color={!isUser ? "gray" : "blue"}
        variant="filled"
        size="lg"
        h="30px"
      >
        <Group align="center" position="center">
          {!isUser && (
            <Avatar
              src={
                picture
                  ? `data:image/png;base64,${picture}`
                  : baseProfilePicture
              }
              size="sm"
              radius="xl"
            />
          )}
          <Text>{comment.commentText}</Text>
          {isUser && (
            <Avatar
              src={
                picture
                  ? `data:image/png;base64,${picture}`
                  : baseProfilePicture
              }
              size="sm"
              radius="xl"
            />
          )}
        </Group>
      </Badge>
    </Stack>
  );
}
