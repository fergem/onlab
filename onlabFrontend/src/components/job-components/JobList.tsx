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
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/react-query/AuthHooks";
import { JobPreview } from "../../models/Job";
import { basePetPicture, baseProfilePicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import RepeatedJobIcon from "../utility-components/RepeatedJobIcon";
import { PetCountWithIcon } from "./JobDetail";

interface IPropsJobList {
  jobs?: JobPreview[];
  isLoading: boolean;
  isError: boolean;
  refetch(): void;
}

export default function JobList({
  jobs,
  isLoading,
  isError,
  refetch,
}: IPropsJobList) {
  return (
    <LoadingBoundary
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
      isEmpty={jobs && jobs.length === 0}
      emptyMessage="No jobs to show. Try changing the job filters."
    >
      {jobs && (
        <Group position="center" align="left">
          {jobs.length > 0 && jobs.map((x) => <JobCard key={x.id} job={x} />)}
        </Group>
      )}
    </LoadingBoundary>
  );
}

interface IPropsJobCard {
  job: JobPreview;
}

function JobCard({ job }: IPropsJobCard) {
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
            src={ImageFunctions.toDisplayImage(
              basePetPicture,
              job.displayPetPicture
            )}
            alt="Job picture"
          />
          <Avatar
            src={ImageFunctions.toDisplayImage(
              baseProfilePicture,
              job.ownerUserPicture
            )}
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

          {!job.isRepeated && (
            <Text size="sm">
              {dayjs(job.startDate).format("MMM DD")}-
              {dayjs(job.endDate).format("MMM DD")}
            </Text>
          )}
          {job.isRepeated && (
            <>
              <Text size="sm">
                Starts on {dayjs(job.startDate).format("MMM DD")}
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
