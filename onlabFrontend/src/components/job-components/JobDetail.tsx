import {
  Badge,
  Box,
  Button,
  Flex,
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
  IconCat,
  IconDog,
  IconDogBowl,
  IconHome,
  IconPaw,
  IconX,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHooks";
import { useGetJob, useProgressJob } from "../../hooks/JobHooks";
import { Days, JobType, Status } from "../../models/Job";
import Pet, { PetSpecies } from "../../models/Pet";
import { basePetPicture, baseProfilePicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";
import { PetGrid } from "../pet-components/PetList";

function JobDetail() {
  const { id } = useParams();
  const { job, error, loading, getJob } = useGetJob(id);
  const { takeJob, finishJob } = useProgressJob();
  const { user } = useAuth();

  const handleTakeJob = () => {
    if (job) takeJob(job.id);
  };

  const handleFinishJob = () => {
    if (job) finishJob(job.id);
  };
  return (
    <Stack align="center" justify="center">
      <LoadingBoundary loading={loading} error={error} refetch={getJob}>
        <Grid w="85%" justify="space-around" gutter="xl">
          <Grid.Col span={4}>
            <Paper p="md" shadow="sm" withBorder>
              <Stack justify="center" align="center">
                <Group>
                  <Image
                    radius="sm"
                    width="5vw"
                    height="5vw"
                    src={
                      job?.ownerUserInformation?.picture
                        ? `data:image/png;base64,${job?.ownerUserInformation.picture}`
                        : baseProfilePicture
                    }
                    alt="Your picture"
                  />
                  <Box>
                    <Title order={5} mb="3%">
                      {job?.ownerUserInformation?.userName ?? ""}
                    </Title>
                    <Text>Pet parent</Text>
                  </Box>
                </Group>
                <JobTypeBadge jobType={job?.type} />
                <Box>
                  <Text fz="sm" fw={500}>
                    Date
                  </Text>
                  <Text>
                    {
                      new Date(job?.startDate ?? "")
                        .toLocaleString()
                        .split(",")[0]
                    }
                    {job?.endDate
                      ? `-${
                          new Date(job?.endDate).toLocaleString().split(",")[0]
                        }`
                      : ""}
                  </Text>
                </Box>
                {job?.repeated && <ChipDays days={job?.days} />}
                <Flex
                  gap="md"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="wrap"
                >
                  <Text>{job?.hours} hours of work</Text>
                  <Text>{job?.payment}$/hours</Text>
                  <Title order={5}>Location: </Title>
                  <Text>{job?.location ?? "No"}</Text>
                  <Title order={5}>Min. experience: </Title>
                  <Text>{job?.minRequiredExperience ?? "No"} years</Text>
                </Flex>
                {user?.id !== job?.ownerUserInformation?.id &&
                  job?.status === Status.Available && (
                    <Button onClick={handleTakeJob}>Take Job</Button>
                  )}
                {user?.id === job?.ownerUserInformation?.id &&
                  job?.status === Status.Inprogress && (
                    <Button onClick={handleFinishJob}>Finish job</Button>
                  )}
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={7}>
            <Stack align="top" justify="top">
              <Box>
                <Title order={2} mb="sm">
                  {job?.title}{" "}
                </Title>
                <Text fz="md" fw={500} mb="xs">
                  {job?.location}{" "}
                </Text>
                <PetCountWithIcon pets={job?.pets} />
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
          height="10vw"
          width="10vw"
          src={
            pet.image
              ? `data:image/png;base64,${pet.image.picture}`
              : basePetPicture
          }
        />
        <Text>{pet.name}</Text>
      </Stack>
    </Paper>
  );
}

interface IPetCountWithProps {
  pets?: Pet[];
}

export function PetCountWithIcon({ pets }: IPetCountWithProps) {
  const dogCount = pets?.filter((s) => s.species === PetSpecies.Dog).length;
  const catCount = pets?.filter((s) => s.species === PetSpecies.Cat).length;
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
  days?: Days[];
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
