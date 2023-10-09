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
import { useAuth } from "../../hooks/react-query/AuthHooks";
import {
  useApplyToJob,
  useGetApplicationsForJob,
} from "../../hooks/react-query/JobApplicationHooks";
import { useGetJob } from "../../hooks/react-query/JobHooks";
import { Day, JobType, Status } from "../../models/Job";
import { Pet, PetSpecies } from "../../models/Pet";
import { basePetPicture, baseProfilePicture } from "../../utility/constants";
import { PetGrid } from "../pet-components/PetList";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import JobOwnerCommentsSection from "./comment-section/JobOwnerCommentsSection";

function JobDetail() {
  const { id } = useParams();
  const { job, error, loading, getJob } = useGetJob(id);
  const { user } = useAuth();
  const {
    loadingApplications,
    errorApplications,
    applications,
    refetchApplications,
  } = useGetApplicationsForJob(id);

  const { applyToJob } = useApplyToJob();

  const handleApplyToJob = () => {
    if (job) {
      console.log(job.id);
      applyToJob(job.id);
      // navigate("/postedjobs");
    }
  };

  // const handleFinishJob = () => {
  //   if (job) finishJob(job.id);
  // };
  const dogCount = job?.pets?.filter((s) => s.species === PetSpecies.Dog)
    .length;
  const catCount = job?.pets?.filter((s) => s.species === PetSpecies.Cat)
    .length;
  return (
    <Stack justify="center" align="center">
      <LoadingBoundary loading={loading} error={error} refetch={getJob}>
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
                      job?.ownerUser?.picture
                        ? `data:image/png;base64,${job?.ownerUser.picture}`
                        : baseProfilePicture
                    }
                    alt="Your picture"
                  />
                  <Box>
                    <Title order={5} mb="3%">
                      {job?.ownerUser?.firstName ?? ""}
                      {job?.ownerUser?.lastName ?? ""}
                    </Title>
                    <Text>Pet parent</Text>
                  </Box>
                </Group>
                <JobTypeBadge jobType={job?.type} />
                <Group position="center" align="center">
                  <Box>
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
                    <Box>
                      <Text fw={700}>End date</Text>
                      <Text>
                        {new Date(job?.endDate).toLocaleString().split(",")[0]}
                      </Text>
                    </Box>
                  )}
                  <Box>
                    <Text fw={700}>Payment:</Text>
                    <Text>{job?.payment}$/hours</Text>
                  </Box>
                  <Box>
                    <Text>
                      <Text fw={700}>Min. experience: </Text>
                      {job?.minRequiredExperience ?? "No"} years
                    </Text>
                  </Box>
                </Group>

                {job?.repeated && <ChipDays days={job?.days} />}

                {user?.id !== job?.ownerUser?.id &&
                  (job?.status === Status.Available ||
                    job?.status === Status.Approving) &&
                  !applications.some(
                    (s) => s.applicantUser.id === user?.id
                  ) && <Button onClick={handleApplyToJob}>Apply to Job</Button>}
                {user?.id === job?.ownerUser?.id &&
                  job?.status === Status.Upcoming && (
                    <Group position="center" align="center">
                      <Button onClick={() => {}} color="red">
                        Cancel job
                      </Button>
                    </Group>
                  )}
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={7}>
            <Stack align="top" justify="top">
              <Box>
                <Group position="left" align="center" spacing={1} mb="sm">
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

                <Text fz="md" fw={500} mb="xs">
                  {job?.location}{" "}
                </Text>
                <PetCountWithIcon dogCount={dogCount} catCount={catCount} />
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
      >
        <JobOwnerCommentsSection
          applications={applications}
          ownerUser={job?.ownerUser}
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
            pet.images
              ? `data:image/png;base64,${pet.images[0]}`
              : basePetPicture
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
