import {
  Image,
  Paper,
  Stack,
  Title,
  Text,
  Group,
  Container,
  Button,
  BackgroundImage,
  Center,
} from "@mantine/core";
import NavButton from "../components/NavButton";
import { useUser } from "../hooks/AuthHooks";
import { useNotification } from "../hooks/useNotification";

export default function Home() {
  const notif = useNotification();
  const user = useUser();
  return (
    <BackgroundImage
      src="https://www.detroitnews.com/gcdn/-mm-/1f3e8534ce98d81f8dea2cd91a8b4d00ab8e7dcb/c=0-281-3000-1969/local/-/media/2017/10/16/DetroitNews/B99587264Z.1_20171016170706_000_GL31MR56K.1-0.jpg?width=1600&height=800&fit=crop&format=pjpg&auto=webp"
      radius="md">
      <Center mih="80vh">
        <Group position="center" noWrap m={"5%"} spacing="xl">
          <Paper shadow="sm" p="xl" radius="md">
            <Stack align="center">
              <Title order={2}>Do you want your pet to be sitted?</Title>
              <Text py="2" mx="4%">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel
                illo possimus fuga quam eum ipsum expedita, sint distinctio
              </Text>
              <NavButton
                name="Be a pet owner!"
                route={user !== null ? "/" : "/register"}
              />
            </Stack>
          </Paper>
          <Paper shadow="sm" p="xl" radius="md">
            <Stack align="center">
              <Title order={2}>Do you want to be a petsitter?</Title>
              <Text py="2" mx="4%">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel
                illo possimus fuga quam eum ipsum expedita, sint distinctio
              </Text>
              <NavButton
                name="Be a petsitter!"
                route={user !== null ? "/" : "/register"}
              />
            </Stack>
          </Paper>
        </Group>
      </Center>
    </BackgroundImage>
  );
}
