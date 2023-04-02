/* eslint-disable react/no-unescaped-entities */

import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import NavButton from "../components/NavButton";

export default function Home() {
  return (
    <Flex
      px="20%"
      direction="column"
      gap="7"
      py="2%"
      textAlign="center"
      h="inherit">
      <Card
        direction="row"
        backgroundColor="#EAEFD3"
        color="#505168"
        boxShadow="dark-lg"
        padding="8"
        borderRadius="xl">
        <Image
          src="https://www.petspyjamas.com/uploads/2020/04/shutterstock_189642425-690x460.jpg"
          boxSize="30%"
          m="2%"
          borderRadius="5%"
        />
        <Flex justify="center" direction="column" alignItems="center">
          <CardBody paddingBottom="0">
            <Heading as="h1" size="lg" marginBottom="3%">
              Do you want your pet to have a nice vacation as you'll have?
            </Heading>
            <Text py="2" mx="4%">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel
              illo possimus fuga quam eum ipsum expedita, sint distinctio
            </Text>
          </CardBody>
          <CardFooter>
            <NavButton name="Be a pet owner!" route="/register" />
          </CardFooter>
        </Flex>
      </Card>
      <Card
        direction="row-reverse"
        backgroundColor="#EAEFD3"
        color="#505168"
        boxShadow="dark-lg"
        padding="8"
        borderRadius="xl">
        <Image
          src="https://images.prismic.io/yoopies-cms/e461e7ee-3b54-46e4-aff2-5e29466e1495_matt-nelson-aI3EBLvcyu4-unsplash.jpg?auto=compress,format&rect=0,0,7952,5301&w=1200&h=800"
          boxSize="30%"
          m="2%"
          borderRadius="5%"
        />
        <Flex justify="center" direction="column" alignItems="center">
          <CardBody paddingBottom="0">
            <Heading as="h1" size="lg" marginBottom="3%">
              Do you want to be a petsitter?
            </Heading>
            <Text py="2" mx="4%">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              dolorum ex ullam modi, tenetur animi, quidem numquam nihil vel
              illo possimus fuga quam eum ipsum expedita, sint distinctio
            </Text>
          </CardBody>
          <CardFooter>
            <NavButton name="Be a petsitter!" route="/register" />
          </CardFooter>
        </Flex>
      </Card>
    </Flex>
  );
}
