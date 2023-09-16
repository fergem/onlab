import { Flex, Image } from "@mantine/core";
import { useState } from "react";
import { basePetPicture } from "../utility/constants";

export interface IPropsSelectableImage {
  onClick(id: number): void;
  source: string;
  title: string;
  id: number | null;
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
      align="center"
      justify="center"
      p="15px"
      onClick={handleClick}
      bg={selected ? "indigo.2" : "white"}
      sx={(theme) => ({
        borderRadius: "5%",
        "&:hover": {
          backgroundColor: theme.colors.indigo[2],
        },
        transition: "background-color 0.3s ease",
      })}
    >
      <Image
        height="125px"
        width="125px"
        radius="md"
        src={`data:image/png;base64,${source}` ?? basePetPicture}
        alt={title}
      />
    </Flex>
  );
}
