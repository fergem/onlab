import {
  Avatar,
  Center,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/AuthHooks";
import { useDeleteJob } from "../../hooks/JobHooks";
import Job from "../../models/Job";
import { basePetPicture, baseProfilePicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";
import { PetCountWithIcon } from "./JobDetail";

export interface IPropsJobList {
  jobs: Job[];
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
    >
      <Group position="center" align="left">
        {jobs.length > 0 && jobs.map((x) => <JobCard key={x.id} job={x} />)}
      </Group>
    </LoadingBoundary>
  );
}

export interface IPropsJobCard {
  job: Job;
}

export function JobCard({ job }: IPropsJobCard) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { deleteJob } = useDeleteJob();
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    deleteJob(job.id);
    event.stopPropagation();
  };
  return (
    <Paper
      shadow="sm"
      p="xs"
      withBorder
      onClick={() => navigate(`/jobs/${job.id}`, { state: { job } })}
    >
      <Stack maw="250px" justify="center">
        <Center sx={() => ({ position: "relative" })}>
          <Image
            width="13vw"
            height="13vw"
            radius="md"
            src={
              job?.pets?.at(0)?.images?.at(0)
                ? `data:image/png;base64,${job?.pets?.at(0)?.images?.at(0)}`
                : basePetPicture
            }
            alt="Job picture"
          />
          <Avatar
            src={
              job?.ownerUserInformation?.picture
                ? `data:image/png;base64,${job.ownerUserInformation.picture}`
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
          {/* {job?.ownerUserInformation?.id === user?.id && (
            <ActionIcon
              size="sm"
              color="red"
              variant="transparent"
              onClick={handleDelete}
              sx={() => ({
                position: "absolute",
                top: "10px",
                right: "10px",
              })}
            >
              <IconTrash />
            </ActionIcon>
          )} */}
        </Center>

        <Stack justify="top" mx="10%" align="left" spacing={1}>
          <Title order={3} lineClamp={1}>
            {job?.ownerUserInformation?.id === user?.id
              ? `${job?.title} (Your job)`
              : job?.title}
          </Title>

          {!job.repeated && (
            <Text size="md">
              {new Date(job?.startDate ?? "").toLocaleString().split(",")[0]}
              {job?.endDate
                ? `-${new Date(job?.endDate).toLocaleString().split(",")[0]}`
                : ""}
            </Text>
          )}
          {job.repeated && (
            <>
              <Text size="md">
                Starts on{" "}
                {new Date(job?.startDate ?? "").toLocaleString().split(",")[0]}
              </Text>
              <Text size="sm">{job.days?.length} days/week</Text>
            </>
          )}
          <Text size="sm">{job.location}</Text>
          <PetCountWithIcon pets={job?.pets} />
        </Stack>
      </Stack>
    </Paper>
  );
}
