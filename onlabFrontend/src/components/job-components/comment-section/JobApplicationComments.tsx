import {
  ActionIcon,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMoodSmileBeam, IconSend } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import {
  useJobApplicationCommentHub,
  usePostComment,
} from "../../../hooks/react-query/JobApplicationHooks";
import { JobApplication } from "../../../models/JobApplication";
import { UserPreview } from "../../../models/User";
import MessageBubble from "./MessageBubble";

export interface IPropsJobComments {
  application: JobApplication;
  ownerUser?: UserPreview;
}

export default function JobApplicationComments({
  application,
  ownerUser,
}: IPropsJobComments) {
  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (viewport.current) {
      console.log(
        viewport.current.scrollTo({
          top: viewport.current.scrollHeight,
          behavior: "smooth",
        })
      );
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const queryClient = useQueryClient();
  const handleCommentUpdate = () => {
    queryClient.invalidateQueries(["query-applications"]);
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
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Paper shadow="sm" p="xl" withBorder>
      <Stack>
        <ScrollArea h={300} offsetScrollbars viewportRef={viewport}>
          <Stack justify="center">
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
              />
            ))}
            {typing && (
              <Group position="center">
                <Text>Someone is writing</Text>
                <Loader variant="dots" />
              </Group>
            )}
          </Stack>
        </ScrollArea>
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
