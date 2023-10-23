import { Avatar, Paper, Tabs, Text } from "@mantine/core";
import { JobApplication } from "../../../models/JobApplication";
import { UserPreview } from "../../../models/User";
import { baseProfilePicture } from "../../../utility/constants";
import JobApplicationComments from "./JobApplicationComments";

export interface IJobPetSitterCommentSection {
  application?: JobApplication;
  ownerUser?: UserPreview;
}

export default function JobPetSitterCommentSection({
  application,
  ownerUser,
}: IJobPetSitterCommentSection) {
  // Should not happen
  if (!application) return <div />;
  return (
    <Paper p="md" shadow="sm" withBorder w="60%">
      <Tabs defaultValue={application.id.toString()}>
        <Tabs.List>
          <Tabs.Tab
            value={application.id.toString()}
            icon={
              <Avatar
                src={
                  ownerUser?.picture
                    ? `data:image/png;base64,${ownerUser.picture}`
                    : baseProfilePicture
                }
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
          />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
