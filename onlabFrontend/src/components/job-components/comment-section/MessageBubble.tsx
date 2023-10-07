import { Avatar, Badge, Group, Stack, Text } from "@mantine/core";
import { format, formatRelative } from "date-fns";
import { useUser } from "../../../hooks/react-query/AuthHooks";
import { JobApplicationComment } from "../../../models/JobApplicationComment";
import { baseProfilePicture } from "../../../utility/constants";

export interface IPropsMessageBubble {
  comment: JobApplicationComment;
  picture?: string;
  isLast: boolean;
  isNewMessage: boolean;
}

export default function MessageBubble({
  comment,
  picture,
  isLast = false,
  isNewMessage = false,
}: IPropsMessageBubble) {
  const { user } = useUser();
  const isUser = comment.senderUserID === user?.id;
  return (
    <Stack align={!isUser ? "flex-start" : "flex-end"} spacing={0}>
      {isNewMessage && (
        <Text
          fz="14px"
          align="center"
          sx={() => ({ alignSelf: "center" })}
          my="xs"
        >
          {format(new Date(comment.commentDate), "MM/dd/yyyy")}
        </Text>
      )}
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
      {isLast && (
        <Text fz="10px">
          {formatRelative(new Date(comment.commentDate), new Date())}
        </Text>
      )}
    </Stack>
  );
}
