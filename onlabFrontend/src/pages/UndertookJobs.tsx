import { Stack } from "@mantine/core";
import UndertookJobsSection from "../components/undertook-jobs-components/UndertookJobsSection";

export default function UndertookJobs() {
  return (
    <Stack align="center" justify="center">
      <Stack w="60%" justify="center">
        <UndertookJobsSection />
      </Stack>
    </Stack>
  );
}
