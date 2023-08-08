import { Image, Paper, Stack, Title, Text, Group } from "@mantine/core";
import NavButton from "../components/NavButton";

export default function Home() {
  return (
    <Group position="center" noWrap m={"5%"} spacing="xl">
      <Paper shadow="sm" p="xl">
        <Stack align="center">
          <Image
            src="https://www.petspyjamas.com/uploads/2020/04/shutterstock_189642425-690x460.jpg"
            m="2%"
            maw={500}
            radius="md"
          />
          <Title order={2}>
            Do you want your pet to have a nice vacation as you'll have?
          </Title>
          <Text py="2" mx="4%">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel illo
            possimus fuga quam eum ipsum expedita, sint distinctio
          </Text>
          <NavButton name="Be a pet owner!" route="/register" />
        </Stack>
      </Paper>
      <Paper shadow="sm" p="xl">
        <Stack align="center">
          <Image
            src="https://images.prismic.io/yoopies-cms/e461e7ee-3b54-46e4-aff2-5e29466e1495_matt-nelson-aI3EBLvcyu4-unsplash.jpg?auto=compress,format&rect=0,0,7952,5301&w=1200&h=800"
            m="2%"
            maw={500}
            radius="md"
          />
          <Title order={2}>Do you want to be a petsitter?</Title>
          <Text py="2" mx="4%">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel illo
            possimus fuga quam eum ipsum expedita, sint distinctio
          </Text>
          <NavButton name="Be a petsitter!" route="/register" />
        </Stack>
      </Paper>
    </Group>
  );
}
