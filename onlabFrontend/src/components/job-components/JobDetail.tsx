import {
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBed,
  IconDogBowl,
  IconHome,
  IconPaw,
  IconX,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/react-query/AuthHooks";
import {
  useApplyToJob,
  useGetApplicationsForJob,
} from "../../hooks/react-query/JobApplicationHooks";
import { useGetJob } from "../../hooks/react-query/JobHooks";
import { Day, JobType } from "../../models/Job";
import { JobApplicationStatus } from "../../models/JobApplication";
import { UserRole } from "../../models/User";
import { baseProfilePicture } from "../../utility/constants";
import { PetGrid } from "../pet-components/PetList";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import JobCommentsSection from "./JobCommentsSection";

function JobDetail() {
  const { id } = useParams();
  const { job, isError, isLoading, getJob } = useGetJob(id);
  const { user } = useUser();
  const {
    isLoadingApplications,
    isErrorApplications,
    applications,
    refetchApplications,
  } = useGetApplicationsForJob(id);

  const { applyToJob } = useApplyToJob();

  const handleApplyToJob = () => {
    if (job) {
      applyToJob(job.id);
    }
  };

  const isOwner = user && user.id === job?.ownerUser.id;
  const ownerUser = job?.ownerUser;
  const userApplication = applications.find(
    (s) => s.applicantUser.id === user?.id
  );
  const isNotOwnerAndPetSitter =
    user?.id !== job?.ownerUser?.id && user?.roles.includes(UserRole.PetSitter);

  const canApplyToJob =
    (isNotOwnerAndPetSitter && !userApplication) ||
    (isNotOwnerAndPetSitter &&
      userApplication &&
      userApplication.status === JobApplicationStatus.Canceled);

  return (
    <Stack justify="center" align="center">
      <LoadingBoundary isLoading={isLoading} isError={isError} refetch={getJob}>
        <Grid w="60%" justify="space-around" gutter="xl">
          <Grid.Col span={4}>
            <Paper p="md" shadow="sm" withBorder>
              <Stack justify="center">
                <Group>
                  <Image
                    radius="sm"
                    width="7vw"
                    height="7vw"
                    src={
                      ownerUser?.picture
                        ? `data:image/png;base64,${ownerUser.picture}`
                        : baseProfilePicture
                    }
                    alt="Your picture"
                  />
                  <Box>
                    <Title order={5} mb="3%">
                      {ownerUser?.firstName} {ownerUser?.lastName}
                    </Title>
                    <Text>Pet parent</Text>
                  </Box>
                </Group>
                <JobTypeBadge jobType={job?.type} />
                <Stack align="flex-start">
                  <Group position="center">
                    <Box>
                      <Text fw={700} fz={13}>
                        Start date
                      </Text>
                      <Text fz={13}>
                        {
                          new Date(job?.startDate ?? "")
                            .toLocaleString()
                            .split(",")[0]
                        }
                      </Text>
                    </Box>
                    {job?.endDate && (
                      <Box>
                        <Text fw={700} fz={13}>
                          End date
                        </Text>
                        <Text fz={13}>
                          {
                            new Date(job?.endDate)
                              .toLocaleString()
                              .split(",")[0]
                          }
                        </Text>
                      </Box>
                    )}
                  </Group>
                  <Group position="center">
                    <Box>
                      <Text fw={700} fz={13}>
                        Payment:
                      </Text>
                      <Text fz={13}>{job?.payment}$/hours</Text>
                    </Box>
                    <Box>
                      <Text fz={13}>
                        <Text fw={700}>Min. experience: </Text>
                        {job?.minRequiredExperience ?? "No"} years
                      </Text>
                    </Box>
                  </Group>
                </Stack>
                {job?.repeated && <ChipDays days={job?.days} />}
                {canApplyToJob && (
                  <Button onClick={handleApplyToJob}>Apply to job</Button>
                )}
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={7}>
            <Stack align="top" justify="top">
              <Box>
                <Group position="left" align="center" spacing={1} mb="5px">
                  <Title order={2}>{job?.title} </Title>
                </Group>
                <Text fz="md" fw={500}>
                  {job?.location}{" "}
                </Text>
              </Box>
              <Title order={4}>Description: </Title>
              <Text lineClamp={0}>{job?.description}</Text>{" "}
              <Title order={3} align="center">
                Pets that you will have to look for
              </Title>
              <PetGrid pets={job?.pets} />
            </Stack>
          </Grid.Col>
        </Grid>
      </LoadingBoundary>
      <LoadingBoundary
        isLoading={isLoadingApplications}
        isError={isErrorApplications}
        refetch={refetchApplications}
      >
        <JobCommentsSection
          ownerUser={ownerUser}
          isOwner={isOwner}
          applications={applications}
        />
      </LoadingBoundary>
    </Stack>
  );
}

interface IBadgeDaysProps {
  days?: Day[];
}

function ChipDays({ days }: IBadgeDaysProps) {
  if (!days) return;
  return (
    <Group position="center" align="center">
      {Object.values(days).map((s) => (
        <Badge key={s} size="md" radius="sm" variant="outline">
          {s}
        </Badge>
      ))}
    </Group>
  );
}

interface IBadgeJobType {
  jobType?: JobType;
}
function JobTypeBadge({ jobType }: IBadgeJobType) {
  switch (jobType) {
    case JobType.Boarding:
      return (
        <Badge size="lg" radius="sm" variant="outline">
          <Group noWrap spacing={0}>
            <IconBed />
            <Text ml="sm">{jobType}</Text>
          </Group>
        </Badge>
      );
    case JobType.Sitting:
      return (
        <Badge size="lg" radius="sm" variant="outline">
          <Group noWrap spacing={0}>
            <IconHome />
            <Text ml="sm">{jobType}</Text>
          </Group>
        </Badge>
      );
    case JobType.Visit:
      return (
        <Badge size="lg" radius="sm" variant="outline">
          <Group noWrap spacing={0}>
            <IconDogBowl />
            <Text ml="sm">{jobType}</Text>
          </Group>
        </Badge>
      );
    case JobType.Walking:
      return (
        <Badge size="lg" radius="sm" variant="outline">
          <Group noWrap spacing={0}>
            <IconPaw />
            <Text ml="sm">{jobType}</Text>
          </Group>
        </Badge>
      );
    default:
      return <IconX />;
  }
}
export default JobDetail;
