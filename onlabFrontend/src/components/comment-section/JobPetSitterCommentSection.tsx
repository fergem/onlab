import { Avatar, Paper, Tabs, Text } from "@mantine/core";
import { JobApplication } from "../../models/JobApplication";
import { UserPreview } from "../../models/User";
import { baseProfilePicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";
import JobApplicationComments from "./JobApplicationComments";

interface IJobPetSitterCommentSection {
  application: JobApplication;
  ownerUser?: UserPreview;
}

export default function JobPetSitterCommentSection({
  application,
  ownerUser,
}: IJobPetSitterCommentSection) {
  return (
    <Paper p="md" shadow="sm" withBorder w="60%">
      <Tabs defaultValue={application.id.toString()}>
        <Tabs.List>
          <Tabs.Tab
            value={application.id.toString()}
            icon={
              <Avatar
                src={ImageFunctions.toDisplayImage(
                  baseProfilePicture,
                  ownerUser?.picture
                )}
                radius="xl"
              />
            }
          >
            <Text>{`${ownerUser?.firstName} ${ownerUser?.lastName}`}</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={application.id.toString()} pt="xs" py="0">
          <JobApplicationComments
            application={application}
            ownerUser={ownerUser}
            miw={400}
          />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
