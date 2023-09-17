import { BackgroundImage, Center, Stack, Title } from "@mantine/core";
import JobHomeFilter from "../components/job-components/JobHomeFilter";
import { useUser } from "../hooks/AuthHooks";

export default function Home() {
  const user = useUser();
  return (
    <BackgroundImage
      src="https://www.detroitnews.com/gcdn/-mm-/1f3e8534ce98d81f8dea2cd91a8b4d00ab8e7dcb/c=0-281-3000-1969/local/-/media/2017/10/16/DetroitNews/B99587264Z.1_20171016170706_000_GL31MR56K.1-0.jpg?width=1600&height=800&fit=crop&format=pjpg&auto=webp"
      radius="md"
    >
      <Center mih="80vh">
        <Stack align="center">
          <Title order={2} color="white">
            Give your pet a lovely holiday when you are not around
          </Title>
          <JobHomeFilter />
        </Stack>
      </Center>
    </BackgroundImage>
  );
}
