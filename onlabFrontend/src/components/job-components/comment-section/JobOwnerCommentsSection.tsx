import { Avatar, Paper, Tabs, Text } from "@mantine/core";
import { JobApplication } from "../../../models/JobApplication";
import { UserPreview } from "../../../models/User";
import { baseProfilePicture } from "../../../utility/constants";
import JobApplicationComments from "./JobApplicationComments";

export interface IJobCommentSectionProps {
  applications: JobApplication[];
  ownerUser?: UserPreview;
}

export default function JobOwnerCommentsSection({
  applications,
  ownerUser,
}: IJobCommentSectionProps) {
  return (
    <Paper p="md" shadow="sm" withBorder w="60%">
      <Tabs defaultValue={applications.at(0)?.id.toString()}>
        <Tabs.List>
          {applications.map((s) => (
            <Tabs.Tab
              value={s.id.toString()}
              icon={
                <Avatar
                  src={
                    s.applicantUser.picture
                      ? `data:image/png;base64,${s.applicantUser.picture}`
                      : baseProfilePicture
                  }
                  radius="xl"
                />
              }
              key={s.id}
            >
              <Text>{`${s.applicantUser.firstName} ${s.applicantUser.lastName}`}</Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {applications.map((s) => (
          <Tabs.Panel value={s.id.toString()} key={s.id} pt="xs" py="0">
            <JobApplicationComments application={s} ownerUser={ownerUser} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Paper>
  );
}
