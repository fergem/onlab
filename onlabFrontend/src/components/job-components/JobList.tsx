import {
  Alert,
  Button,
  Container,
  Group,
  Loader,
  Stack,
  Title,
  Text,
  Image,
  Paper,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Job from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";

export interface IPropsJobCard {
  job: Job;
}

export interface IPropsJobList {
  jobs: Job[];
  loading: boolean;
  error: boolean;
  refetch(): void;
}

export const JobList: React.FC<IPropsJobList> = ({
  jobs,
  loading,
  error,
  refetch,
}) => {
  if (loading) {
    return <Loader size="xl" />;
  } else if (error) {
    return (
      <>
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Bummer!"
          color="red">
          Something terrible happened! You made a mistake and there is no going
          back, your data was lost forever!
        </Alert>
        <Button onClick={() => refetch()}>Click me to try again!</Button>
      </>
    );
  } else if (jobs.length === 0) {
    return <Title order={2}>There are currently no available jobs</Title>;
  }

  return (
    <Stack align="center" justify="center">
      {jobs.map((x) => (
        <JobCard key={x.id} job={x} />
      ))}
    </Stack>
  );
};

const JobCard: React.FC<IPropsJobCard> = ({ job }) => {
  const navigate = useNavigate();
  return (
    <Paper
      shadow="sm"
      p="sm"
      withBorder
      onClick={() => navigate("/job", { state: { job } })}>
      <Container m="0px" w="600px">
        <Group>
          <Image
            fit="contain"
            radius="md"
            maw="200px"
            miw="200px"
            height="200px"
            src={
              job?.ownerUserInformation?.picture
                ? "data:image/png;base64," + job.ownerUserInformation.picture
                : baseProfilePicture
            }
            alt="Job picture"
          />
          <Title order={3}>{job?.ownerUserInformation?.userName}'s job</Title>
          <Stack>
            <Text size="sm"> {job.hours} hours of work</Text>
            <Text size="sm">{job.location}</Text>
          </Stack>
        </Group>
      </Container>
    </Paper>
  );
};
