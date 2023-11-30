import {
  Avatar,
  Group,
  HoverCard,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useMemo } from "react";
import { Status } from "../../models/Job";
import {
  JobApplicationStatus,
  PostedJobApplication,
} from "../../models/JobApplication";
import { baseProfilePicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";
import PostedJobApplicationActions from "./PostedJobApplicationActions";

interface INonRepeatedTableProps {
  jobApplications: PostedJobApplication[];
  jobStatus: Status;
}

export default function PostedJobApplicationTable({
  jobApplications,
  jobStatus,
}: INonRepeatedTableProps) {
  const approvedApplication = useMemo(() => {
    return jobApplications.find(
      (s) => s.status === JobApplicationStatus.Approved
    );
  }, [jobApplications]);

  return (
    <Stack spacing={0}>
      <Stack align="center">
        <Group mb={10}>
          {approvedApplication ? (
            <Title order={4} mr="auto">
              Applied user
            </Title>
          ) : (
            <Title order={4} mr="auto">
              Applications
            </Title>
          )}
        </Group>
      </Stack>
      {jobApplications.length === 0 && (
        <Text align="center">No applications to this job yet.</Text>
      )}
      {jobApplications.length > 0 && (
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Experience</th>
              {!approvedApplication && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {approvedApplication && (
              <PostedJobApplicationRow
                application={approvedApplication}
                jobStatus={jobStatus}
              />
            )}

            {!approvedApplication &&
              jobApplications.map((s) => (
                <PostedJobApplicationRow
                  application={s}
                  key={s.id}
                  jobStatus={jobStatus}
                />
              ))}
          </tbody>
        </Table>
      )}
    </Stack>
  );
}

export interface IPropsPostedJobApplicationRow {
  application: PostedJobApplication;
  jobStatus: Status;
}

export function PostedJobApplicationRow({
  application,
  jobStatus,
}: IPropsPostedJobApplicationRow) {
  return (
    <tr>
      <td>
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <Group>
              <Avatar
                src={ImageFunctions.toDisplayImage(
                  baseProfilePicture,
                  application.applicantUser.picture
                )}
                radius="100%"
              />
              <Text>{`${application.applicantUser.firstName}  ${application.applicantUser.lastName}`}</Text>
            </Group>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Stack spacing={10} align="center">
              <Avatar
                src={ImageFunctions.toDisplayImage(
                  baseProfilePicture,
                  application.applicantUser.picture
                )}
                size="lg"
                radius="100%"
              />
              <Text>{`${application.applicantUser.firstName}  ${application.applicantUser.lastName}`}</Text>
              <Text size="sm" align="center" fw={600}>
                Location
              </Text>
              <Text size="sm" align="center">
                {application.applicantUser.location ?? "No information"}
              </Text>
              <Text size="sm" align="center" fw={600}>
                Description of user
              </Text>
              <Text size="sm" align="center">
                {application.applicantUser.petSitterProfile?.description ??
                  "No information"}
              </Text>
            </Stack>
          </HoverCard.Dropdown>
        </HoverCard>
      </td>
      <td>
        <Text>{application.applicantUser.email}</Text>
      </td>
      <td>
        <Text>{application.applicantUser.phoneNumber ?? "No data"}</Text>
      </td>
      <td>
        <Text>
          {application.applicantUser.petSitterProfile?.acquiredExperience ??
            "No data"}
        </Text>
      </td>
      <td>
        {application.status === JobApplicationStatus.Approving && (
          <PostedJobApplicationActions applicationID={application.id} />
        )}
      </td>
    </tr>
  );
}
