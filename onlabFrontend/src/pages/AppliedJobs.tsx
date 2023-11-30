import { Stack } from "@mantine/core";
import AppliedJobsSection from "../components/applied-jobs-components/AppliedJobsSection";

export default function AppliedJobs() {
  return (
    <Stack align="center" justify="center">
      <Stack w="70%" justify="center">
        <AppliedJobsSection />
      </Stack>
    </Stack>
  );
}
