import { Center, Stack, Title, rem } from "@mantine/core";
import JobHomeFilter from "../components/job-components/JobHomeFilter";

export default function Home() {
  return (
    <Center
      mih="80vh"
      sx={() => ({
        background:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://www.detroitnews.com/gcdn/-mm-/1f3e8534ce98d81f8dea2cd91a8b4d00ab8e7dcb/c=0-281-3000-1969/local/-/media/2017/10/16/DetroitNews/B99587264Z.1_20171016170706_000_GL31MR56K.1-0.jpg?width=1600&height=800&fit=crop&format=pjpg&auto=webp)",
        backgroundSize: "cover",
        borderRadius: rem(7),
      })}
    >
      <Stack align="center">
        <Title order={1} color="white" mb="lg">
          Give your pet a lovely holiday when you are not around
        </Title>
        <JobHomeFilter />
      </Stack>
    </Center>
  );
}
