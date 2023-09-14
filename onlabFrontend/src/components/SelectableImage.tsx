import { Flex, Image } from "@mantine/core";
import { useState } from "react";
import { basePetPicture } from "../utility/constants";

export interface IPropsSelectableImage {
  onClick(id: number): void;
  source: string;
  title: string;
  id: number;
}

export default function SelectableImage({
  id,
  source,
  onClick,
  title,
}: IPropsSelectableImage) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((t) => !t);
    onClick(id);
  };

  return (
    <Flex
      onClick={handleClick}
      bg={selected ? "indigo.2" : "white"}
      align="center"
      justify="center"
      sx={(theme) => ({
        borderRadius: "5%",
        "&:hover": {
          backgroundColor: theme.colors.indigo[2],
        },
        transition: "background-color 0.3s ease",
      })}
      w="125px"
      h="125px"
    >
      <Image
        width="75px"
        height="75px"
        fit="contain"
        radius="md"
        src={source ?? basePetPicture}
        alt="Pet picutre"
        caption={title ?? ""}
      />
    </Flex>
  );
}
