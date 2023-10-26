import {
  Avatar,
  Checkbox,
  Group,
  HoverCard,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { Status } from "../../models/Job";
import {
  JobApplicationStatus,
  PostedJobApplication,
} from "../../models/JobApplication";
import { baseProfilePicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";
import JobActionsApproved from "./JobActionsApproved";
import JobActionsNotApproved from "./JobActionsNotApproved";

interface INonRepeatedTableProps {
  jobApplications: PostedJobApplication[];
  jobStatus: Status;
}

export default function JobUserTable({
  jobApplications,
  jobStatus,
}: INonRepeatedTableProps) {
  const areThereAnyApproved = useMemo(() => {
    return jobApplications.find(
      (s) => s.status === JobApplicationStatus.Approved
    );
  }, [jobApplications]);
  const jobsWithoutTheApproved = useMemo(() => {
    return jobApplications.filter(
      (s) => s.status !== JobApplicationStatus.Approved
    );
  }, [jobApplications]);

  const [showNotApproved, setShowNotApproved] = useState(!areThereAnyApproved);
  const handleSetShowNotApproved = () => {
    setShowNotApproved((t) => !t);
  };
  return (
    <Stack spacing={0}>
      <Stack>
        <Group position="center" align="center" mb={10}>
          <Title order={4} mr="auto">
            Applications
          </Title>
          {areThereAnyApproved && (
            <>
              <Text>Show history:</Text>
              <Checkbox onChange={handleSetShowNotApproved} />
            </>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {areThereAnyApproved && (
              <PostedJobApplicationRow
                application={areThereAnyApproved}
                jobStatus={jobStatus}
              />
            )}
            {!areThereAnyApproved &&
              jobApplications.map((s) => (
                <PostedJobApplicationRow
                  application={s}
                  key={s.id}
                  jobStatus={jobStatus}
                />
              ))}
            {showNotApproved &&
              jobsWithoutTheApproved.map((s) => (
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
              />
              <Text>{`${application.applicantUser.firstName}  ${application.applicantUser.lastName}`}</Text>
              <Text size="sm" align="center" fw={600}>
                Location
              </Text>
              <Text size="sm" align="center">
                {application.applicantUser.location ?? "No information"}
              </Text>
              <Text size="sm" align="center" fw={600}>
                Description
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
        <Text>{application.applicantUser.phoneNumber ?? "-"}</Text>
      </td>
      <td>
        <Text>
          {application.applicantUser.petSitterProfile?.acquiredExperience ??
            "-"}
        </Text>
      </td>
      <td>
        {application.status === JobApplicationStatus.Approving && (
          <JobActionsNotApproved
            applicationID={application.id}
            isJobAvailable={jobStatus === Status.Available}
          />
        )}
        {application.status === JobApplicationStatus.Approved && (
          <JobActionsApproved
            isJobDone={jobStatus === Status.Done}
            applicationID={application.id}
          />
        )}
      </td>
    </tr>
  );
}
