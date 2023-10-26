import {
  Avatar,
  Button,
  Center,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/react-query/AuthHooks";
import { JobPreview } from "../../models/Job";
import { basePetPicture, baseProfilePicture } from "../../utility/constants";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import { PetCountWithIcon } from "./JobDetail";

export interface IPropsJobList {
  jobs: JobPreview[];
  loading: boolean;
  error: boolean;
  refetch(): void;
}

export default function JobList({
  jobs,
  loading,
  error,
  refetch,
}: IPropsJobList) {
  return (
    <LoadingBoundary
      loading={loading}
      error={error}
      refetch={refetch}
      isEmpty={jobs.length === 0}
      withBorder
    >
      <Group position="center" align="left">
        {jobs.length > 0 && jobs.map((x) => <JobCard key={x.id} job={x} />)}
      </Group>
    </LoadingBoundary>
  );
}

export interface IPropsJobCard {
  job: JobPreview;
}

export function JobCard({ job }: IPropsJobCard) {
  const navigate = useNavigate();
  const { user } = useUser();
  const navigateToJob = () => {
    navigate(`/jobs/${job.id}`);
  };
  return (
    <Paper shadow="sm" p="xs" withBorder>
      <Stack maw="250px" justify="center">
        <Center sx={() => ({ position: "relative" })}>
          <Image
            width="13vw"
            height="13vw"
            radius="md"
            src={
              job.displayPetPicture
                ? `data:image/png;base64,${job.displayPetPicture}`
                : basePetPicture
            }
            alt="Job picture"
          />
          <Avatar
            src={
              job.ownerUserPicture
                ? `data:image/png;base64,${job.ownerUserPicture}`
                : baseProfilePicture
            }
            radius="100%"
            h="5vw"
            w="5vw"
            sx={() => ({
              position: "absolute",
              bottom: "-25px",
              right: "-5px",
            })}
          />
        </Center>

        <Stack justify="top" mx="10%" align="left" spacing={1}>
          <Title order={3} lineClamp={1}>
            {job.ownerID === user?.id ? `${job?.title} (Your job)` : job?.title}
          </Title>

          {!job.days && (
            <Text size="md">
              {new Date(job?.startDate ?? "").toLocaleString().split(",")[0]}
              {job?.endDate
                ? `-${new Date(job?.endDate).toLocaleString().split(",")[0]}`
                : ""}
            </Text>
          )}
          {job.days && (
            <>
              <Text size="md">
                Starts on{" "}
                {new Date(job?.startDate ?? "").toLocaleString().split(",")[0]}
              </Text>
              <Text size="sm">{job.days?.length} days/week</Text>
            </>
          )}
          <Text size="sm">{job.location}</Text>
          <Group position="apart">
            <PetCountWithIcon catCount={job.catCount} dogCount={job.dogCount} />

            <Button onClick={navigateToJob} size="xs">
              Details
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
}
