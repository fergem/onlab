import {
  Avatar,
  Button,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/react-query/AuthHooks";
import { JobPreview } from "../../models/Job";
import { basePetPicture, baseProfilePicture } from "../../utility/constants";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import RepeatedJobIcon from "../utility-components/RepeatedJobIcon";
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
  const isDesktop = useMediaQuery("(min-width: 56.25em)");
  const imageSize = isDesktop ? "200px" : "250px";
  const avatarSize = "75px";

  return (
    <Paper shadow="sm" p="xs" withBorder>
      <Stack maw={isDesktop ? "225px" : "100%"} justify="center" spacing={25}>
        <Stack align="center" sx={() => ({ position: "relative" })}>
          <Image
            width={imageSize}
            height={imageSize}
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
            h={avatarSize}
            w={avatarSize}
            sx={() => ({
              position: "absolute",
              bottom: "-25px",
              right: "-5px",
            })}
          />
        </Stack>

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
          <Group position="center">
            <PetCountWithIcon catCount={job.catCount} dogCount={job.dogCount} />
            {job.isRepeated && <RepeatedJobIcon />}
            <Button onClick={navigateToJob} size="xs" ml="auto">
              Details
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
}
