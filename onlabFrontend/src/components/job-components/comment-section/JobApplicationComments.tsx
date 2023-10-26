import {
  ActionIcon,
  Box,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useScrollIntoView } from "@mantine/hooks";
import { IconMoodSmileBeam, IconSend } from "@tabler/icons-react";
import { useQueryClient } from "react-query";
import {
  useJobApplicationCommentHub,
  usePostComment,
} from "../../../hooks/react-query/JobApplicationHooks";
import { JobApplication } from "../../../models/JobApplication";
import { JobApplicationCommentFunctions } from "../../../models/JobApplicationComment";
import { UserPreview } from "../../../models/User";
import { ArrayFunctions } from "../../../utility/array";
import MessageBubble from "./MessageBubble";

export interface IPropsJobComments {
  application: JobApplication;
  ownerUser?: UserPreview;
  miw: number;
}

export default function JobApplicationComments({
  application,
  ownerUser,
  miw,
}: IPropsJobComments) {
  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  const { scrollIntoView, targetRef, scrollableRef } =
    useScrollIntoView<HTMLInputElement>({
      offset: 0,
    });

  const queryClient = useQueryClient();
  const handleCommentUpdate = () => {
    queryClient.invalidateQueries("query-applications");
    queryClient.invalidateQueries("query-usersAppliedTo");
    // queryClient.invalidateQueries(["query-usersAppliedTo"]);
  };

  const { handleInvokeTyping, handleInvokeNotTyping, typing } =
    useJobApplicationCommentHub(application.id, handleCommentUpdate);

  const { commentOnJob } = usePostComment();

  const handlePostComment = () => {
    if (form.values.message !== "")
      commentOnJob({
        applicationID: application.id,
        message: form.values.message,
      });
    form.reset();
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePostComment();
  };

  const handleStartTyping = () => {
    handleInvokeTyping();
    scrollIntoView();
  };

  return (
    <Paper shadow="sm" p="xl" withBorder>
      <Stack miw={miw}>
        <Box
          w="100%"
          h="300px"
          sx={() => ({ overflow: "auto" })}
          ref={scrollableRef}
        >
          <Stack justify="center" spacing={2}>
            {application.comments?.length === 0 && (
              <Stack align="center" justify="center" spacing={0} my={20}>
                <IconMoodSmileBeam size={100} />
                <Title order={4}>Start chatting now!</Title>
              </Stack>
            )}
            {application.comments?.map((s) => (
              <MessageBubble
                comment={s}
                key={s.ID}
                picture={
                  s.senderUserID === application.applicantUser.id
                    ? application.applicantUser.picture
                    : ownerUser?.picture
                }
                isLast={ArrayFunctions.isLastElement(application.comments, s)}
                isNewMessage={JobApplicationCommentFunctions.isOlderThanBefore(
                  application.comments,
                  s
                )}
              />
            ))}
            {typing && (
              <Group position="center">
                <Text>Someone is writing</Text>
                <Loader variant="dots" />
              </Group>
            )}
          </Stack>
        </Box>

        <form onSubmit={handleSubmitComment}>
          <TextInput
            placeholder="Say something"
            rightSection={
              <ActionIcon
                onClick={handlePostComment}
                variant="subtle"
                color="dark"
                radius="md"
                size="lg"
              >
                <IconSend />
              </ActionIcon>
            }
            ref={targetRef}
            autoComplete="off"
            {...form.getInputProps("message")}
            onFocus={handleStartTyping}
            onBlur={handleInvokeNotTyping}
          />
        </form>
      </Stack>
    </Paper>
  );
}
