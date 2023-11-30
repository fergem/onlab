import {
  ActionIcon,
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
  Tooltip,
} from "@mantine/core";
import {
  IconBed,
  IconCat,
  IconDog,
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
import { Pet } from "../../models/Pet";
import { UserRole } from "../../models/User";
import { basePetPicture, baseProfilePicture } from "../../utility/constants";
import { PetGrid } from "../pet-components/PetList";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import JobCommentsSection from "./JobCommentsSection";

function JobDetail() {
  const { id } = useParams();
  const { job, error, loading, getJob } = useGetJob(id);
  const { user } = useUser();
  const {
    loadingApplications,
    errorApplications,
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
      <LoadingBoundary
        loading={loading}
        error={error}
        refetch={getJob}
        withBorder
      >
        <Grid w="60%" justify="space-around" gutter="xl">
          <Grid.Col span={4}>
            <Paper p="md" shadow="sm" withBorder>
              <Stack justify="center" align="center">
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
                      {ownerUser?.firstName}
                      {ownerUser?.lastName}
                    </Title>
                    <Text>Pet parent</Text>
                  </Box>
                </Group>
                <JobTypeBadge jobType={job?.type} />
                <Group position="center" align="center">
                  <Box miw="125px">
                    <Text fw={700}>Start date</Text>
                    <Text>
                      {
                        new Date(job?.startDate ?? "")
                          .toLocaleString()
                          .split(",")[0]
                      }
                    </Text>
                  </Box>
                  {job?.endDate && (
                    <Box miw="125px">
                      <Text fw={700}>End date</Text>
                      <Text>
                        {new Date(job?.endDate).toLocaleString().split(",")[0]}
                      </Text>
                    </Box>
                  )}
                </Group>
                <Group position="center" align="center">
                  <Box miw="125px">
                    <Text fw={700}>Payment:</Text>
                    <Text>{job?.payment}$/hours</Text>
                  </Box>
                  <Box miw="125px">
                    <Text>
                      <Text fw={700}>Min. experience: </Text>
                      {job?.minRequiredExperience ?? "No"} years
                    </Text>
                  </Box>
                </Group>

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
                  {user?.id === job?.ownerUser?.id && (
                    <Tooltip label="Delete">
                      <ActionIcon
                        onClick={() => {}}
                        variant="subtle"
                        color="dark"
                        radius="md"
                        size="lg"
                      >
                        <IconX />
                      </ActionIcon>
                    </Tooltip>
                  )}
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
        loading={loadingApplications}
        error={errorApplications}
        refetch={refetchApplications}
        withBorder={false}
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

export interface IPetsProps {
  pet: Pet;
}

export function PetDescription({ pet }: IPetsProps) {
  return (
    <Paper shadow="sm" withBorder>
      <Stack align="center" justify="center" p="15px">
        <Image
          radius="sm"
          height="5vw"
          width="5vw"
          src={
            pet.image ? `data:image/png;base64,${pet.image[0]}` : basePetPicture
          }
        />
        <Text>{pet.name}</Text>
      </Stack>
    </Paper>
  );
}

interface IPetCountWithProps {
  dogCount?: number;
  catCount?: number;
}

export function PetCountWithIcon({ dogCount, catCount }: IPetCountWithProps) {
  return (
    <Group align="center" spacing={0}>
      {dogCount && dogCount > 0 && (
        <>
          <Text>{dogCount}</Text>
          <IconDog />
        </>
      )}
      {catCount && catCount > 0 && (
        <>
          <Text>{catCount}</Text>
          <IconCat />
        </>
      )}
    </Group>
  );
}

interface IBadgeDaysProps {
  days?: Day[];
}

export function ChipDays({ days }: IBadgeDaysProps) {
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
export function JobTypeBadge({ jobType }: IBadgeJobType) {
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
