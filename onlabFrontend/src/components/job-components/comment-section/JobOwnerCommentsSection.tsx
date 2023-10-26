import { Avatar, Paper, Tabs, Text } from "@mantine/core";
import { useAuth } from "../../../hooks/react-query/AuthHooks";
import { JobApplication } from "../../../models/JobApplication";
import { UserPreview } from "../../../models/User";
import JobApplicationComments from "./JobApplicationComments";

export interface IJobCommentSectionProps {
  applications: JobApplication[];
  ownerUser?: UserPreview;
}

export default function JobOwnerCommentsSection({
  applications,
  ownerUser,
}: IJobCommentSectionProps) {
  const { user } = useAuth();
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
                    user?.id === s.applicantUser.id
                      ? s.applicantUser.picture
                      : ownerUser?.picture
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
            <JobApplicationComments
              application={s}
              ownerUser={ownerUser}
              miw={400}
            />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Paper>
  );
}
