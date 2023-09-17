import {
  Button,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHooks";
import { useGetJob, useProgressJob } from "../../hooks/JobHooks";
import Pet from "../../models/Pet";
import { StatusName } from "../../models/Status";
import { baseDogPicture, baseProfilePicture } from "../../utility/constants";
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
    <Container size="xl">
      <LoadingBoundary loading={loading} error={error} refetch={getJob}>
        <Title order={1} align="center" mb="3%">
          {job?.ownerUserInformation?.userName ?? ""}`s job
        </Title>
        <Group noWrap align="top" position="center" grow spacing="xl">
          <Stack align="center" justify="center">
            <Image
              radius="sm"
              width="15vw"
              height="15vw"
              src={
                job?.ownerUserInformation?.picture
                  ? `data:image/png;base64,${job?.ownerUserInformation.picture}`
                  : baseProfilePicture
              }
              alt="Your picture"
            />
            <Text>{job?.hours} hours of work</Text>
            <Text>{job?.payment}$/hours</Text>
            <Title order={5}>Description: </Title>
            <Text>{job?.description}</Text>{" "}
            <Title order={5}>Current status: </Title>
            <Text>{job?.status?.name ?? "No"}</Text>
            <Title order={5}>Location: </Title>
            <Text>{job?.location ?? "No"}</Text>
            <Title order={5}>Min. experience: </Title>
            <Text>{job?.minRequiredExperience ?? "No"} years</Text>
          </Stack>

          <Stack>
            <Title order={3} align="center">
              Pets that you will have to look for
            </Title>
            <Grid gutter="lg">
              <PetGrid pets={job?.pets} />
            </Grid>
            {user?.id !== job?.ownerUserInformation?.id &&
              job?.status?.name === StatusName.Available && (
                <Button onClick={handleTakeJob}>Take Job</Button>
              )}
            {user?.id === job?.ownerUserInformation?.id &&
              job?.status?.name === StatusName.Inprogress && (
                <Button onClick={handleFinishJob}>Finish job</Button>
              )}
          </Stack>
        </Group>
      </LoadingBoundary>
    </Container>
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
          height="170px"
          width="170px"
          src={
            pet.image
              ? `data:image/png;base64,${pet.image.picture}`
              : baseDogPicture
          }
        />
        <Text>{pet.name}</Text>
      </Stack>
    </Paper>
  );
}

export default JobDetail;
