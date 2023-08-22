import {
  Container,
  Stack,
  Title,
  Text,
  Image,
  Group,
  Button,
  Flex,
  Paper,
  Grid,
} from "@mantine/core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHooks";
import { useTakeJob } from "../../hooks/JobHooks";
import { useNotification } from "../../hooks/useNotification";
import Job from "../../models/Job";
import Pet from "../../models/Pet";
import { baseDogPicture, baseProfilePicture } from "../../utility/constants";

function JobPage() {
  const { state } = useLocation();
  const [job, setJob] = useState(state.job as Job);
  const [takeJob, error, loading] = useTakeJob();
  const { user } = useAuth();
  const notifications = useNotification();
  const handleTakeJob = () => {
    takeJob(job.id);
    if (error) {
      notifications.error("Could not take job");
    }
  };
  return (
    <Container size="xl">
      <Title order={1} align="center" mb="3%">
        {job.ownerUserInformation?.userName ?? ""}'s job
      </Title>
      <Group noWrap align="top" position="center" grow spacing="xl">
        <Paper shadow="sm" p="sm" withBorder>
          <Stack align="center" justify="center">
            <Image
              fit="contain"
              radius="md"
              maw="200px"
              miw="200px"
              height="200px"
              src={
                job.ownerUserInformation?.picture
                  ? "data:image/png;base64," + job.ownerUserInformation.picture
                  : baseProfilePicture
              }
              alt="Your picture"
            />
            <Text>{job.hours} hours of work</Text>
            <Text>{job.payment}$/hours</Text>
            <Title order={5}>Description: </Title>
            <Text>{job.description}</Text>{" "}
            <Title order={5}>Availability: </Title>
            <Text>{job.status?.name ?? "No"}</Text>
            <Title order={5}>Location: </Title>
            <Text>{job.location ?? "No"}</Text>
            <Title order={5}>Minimum required experience: </Title>
            <Text>{job.minRequiredExperience ?? "No"} years</Text>
          </Stack>
        </Paper>

        <Stack>
          <Title order={3} align="center">
            Pets that you will have to look for
          </Title>
          <Grid gutter="lg">
            {job.pets?.map((s) => (
              <Grid.Col span={4} key={s.id}>
                <PetDescription pet={s} />
              </Grid.Col>
            ))}
          </Grid>
          {user?.userName !== job.ownerUserInformation?.userName && (
            <Button onClick={handleTakeJob}>Take Job</Button>
          )}
        </Stack>
      </Group>
    </Container>
  );
}

export interface IPetsProps {
  pet: Pet;
}

export const PetDescription: React.FC<IPetsProps> = ({ pet }) => {
  return (
    <Paper shadow="sm" withBorder>
      <Stack align="center">
        <Image
          fit="contain"
          radius="md"
          maw="175px"
          miw="175px"
          height="175px"
          src={
            pet.image ? "data:image/png;base64," + pet.image : baseDogPicture
          }></Image>
        <Text>{pet.name}</Text>
      </Stack>
    </Paper>
  );
};

export default JobPage;
