import {
  Card,
  CardBody,
  Text,
  Image,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Pet from "../../models/Pet";
import { baseDogPicture } from "../../utility/constants";
import PetDialog from "./PetDialog";

interface IPropsPetCard {
  pet: Pet;
}

interface IPropsPetList {
  pets: Pet[];
}

export const PetList: React.FC<IPropsPetList> = ({ pets }) => {
  return (
    <Wrap w="100%" justify="center" spacing="2%">
      {pets.map((x) => (
        <PetCard key={x.id} pet={x} />
      ))}
    </Wrap>
  );
};

const PetCard: React.FC<IPropsPetCard> = ({ pet }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <WrapItem justifyContent="center" alignItems="center">
      <Card my="2%" color="#505168" h="100%" onClick={onOpen}>
        <CardBody>
          <Image
            borderRadius="100"
            objectFit="cover"
            w="20vh"
            h="20vh"
            mx="3vh"
            mb="2vh"
            src={
              pet.image
                ? "data:image/png;base64," + pet.image.picture
                : baseDogPicture
            }
            alt="Green double couch with wooden legs"
          />
          <Text fontSize="lg">{pet.name}</Text>
          <PetDialog pet={pet} onClose={onClose} isOpen={isOpen}></PetDialog>
        </CardBody>
      </Card>
    </WrapItem>
  );
};
