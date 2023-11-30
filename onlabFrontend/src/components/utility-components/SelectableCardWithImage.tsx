import { Image, Paper, Stack, Text } from "@mantine/core";
import { basePetPicture } from "../../utility/constants";
import { ImageFunctions } from "../../utility/image";

export interface IPropsSelectableImage {
  onClick(id: number): void;
  source?: string;
  title: string;
  id: number;
  selected: boolean;
}

export default function SelectableCardWithImage({
  id,
  source,
  onClick,
  title,
  selected,
}: IPropsSelectableImage) {
  const handleClick = () => {
    onClick(id);
  };
  return (
    <Paper shadow="sm" radius="5%" withBorder>
      <Stack
        align="center"
        justify="center"
        p="15px"
        onClick={handleClick}
        bg={selected ? "blue" : "white"}
        color={selected ? "white" : "black"}
        sx={(theme) => ({
          borderRadius: "5%",
          "&:hover": {
            color: "white",
            outlineStyle: "solid",
            outlineWidth: "1px",
            outlineColor: theme.colors.blue[6],
          },
          transition: "background-color 0.3s ease",
        })}
      >
        <Image
          height="125px"
          width="125px"
          radius="md"
          src={ImageFunctions.toDisplayImage(basePetPicture, source)}
          alt={title}
        />
        <Text color={selected ? "white" : "black"}>{title}</Text>
      </Stack>
    </Paper>
  );
}
