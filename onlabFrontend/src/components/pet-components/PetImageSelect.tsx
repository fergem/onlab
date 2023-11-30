import { Button, FileButton, Group, Image, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useRef } from "react";
import { basePetPicture } from "../../utility/constants";

interface IProps {
  oldPetImage?: File;
  petImage?: File;
  setPetImageFile(image?: File): void;
}
export default function PetImageSelect({
  oldPetImage,
  petImage,
  setPetImageFile,
}: IProps) {
  const upload = (file: File) => {
    setPetImageFile(file);
  };
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setPetImageFile(undefined);
    resetRef.current?.();
  };

  // eslint-disable-next-line no-nested-ternary
  const image = petImage
    ? URL.createObjectURL(petImage)
    : oldPetImage
    ? URL.createObjectURL(oldPetImage)
    : basePetPicture;

  return (
    <>
      <Image
        src={image}
        radius="md"
        width="17vw"
        height="17vw"
        alt="Pet image"
      />

      <Group position="center">
        <FileButton
          resetRef={resetRef}
          onChange={upload}
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <Button {...props}>
              <Group spacing="xs">
                <IconUpload size="20" />
                <Text>Upload Image</Text>
              </Group>
            </Button>
          )}
        </FileButton>
        <Button disabled={!petImage} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>
    </>
  );
}
