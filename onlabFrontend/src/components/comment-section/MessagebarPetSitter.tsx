import { Avatar, Group, Stack, Text } from "@mantine/core";
import { AppliedJob } from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";
import LastComment from "./LastComment";

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

  const lastComment =
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
        <Text fw={600} fz={14} lineClamp={1}>
          {appliedJob.title}
        </Text>
        {lastComment && (
          <LastComment
            lastComment={lastComment}
            appliedUser={appliedJob.jobApplication.applicantUser}
            ownerUser={appliedJob.ownerUser}
          />
        )}
      </Stack>
    </Group>
  );
}
