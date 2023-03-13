import {
    Card,
    Image,
    Stack,
    CardBody,
    Heading,
    Text,
    CardFooter,
    Button,
} from "@chakra-ui/react"
import Pet from "../models/Pet"

interface IProps {
    pet: Pet
}

export const JobCard: React.FC<IProps> = ({pet}) => {
    return (
        <Card direction="row" width="100%">
            <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
            />

            <Stack >
                <CardBody>
                    <Heading size="md">{pet.name}</Heading>

                    <Text py="2">
                        {pet.description}
                    </Text>
                </CardBody>

                <CardFooter>
                    <Button variant="solid" colorScheme="blue">
                        {pet.age}
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    )
}

