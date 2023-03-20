import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import User from "../models/User";

interface IProps {
  user: User;
}

export const JobCard: React.FC<IProps> = ({ user }) => {
  return (
    <Card direction="row" my="2%">
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">
            {user.firstName} {user.lastName} {user.age}
          </Heading>

          <Text py="2">{user.id}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
};
