import { Avatar, Group, Stack, Text } from "@mantine/core";
import { useUser } from "../../hooks/react-query/AuthHooks";
import { JobApplication } from "../../models/JobApplication";
import { baseProfilePicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";
import LastComment from "./LastComment";

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
  const lastComment =
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
        <Text fw={600} fz={14} lineClamp={1}>
          {`${jobApplication.applicantUser.firstName} ${jobApplication.applicantUser.lastName}`}
        </Text>
        {user && lastComment && (
          <LastComment
            lastComment={lastComment}
            appliedUser={jobApplication.applicantUser}
            ownerUser={user}
          />
        )}
      </Stack>
    </Group>
  );
}
