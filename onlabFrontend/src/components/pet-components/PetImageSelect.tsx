import { Image, FileInput, Paper, Box, Center, rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";

interface IProps {
  petImage: File | null;
  setPetimage(image: File): void;
}
export default function PetImageSelect({ petImage, setPetimage }: IProps) {
  const upload = (file: File) => {
    setPetimage(file);
  };

  return (
    <>
      {petImage && (
        <Center>
          <Paper shadow="xs" p="md">
            <Image
              src={URL.createObjectURL(petImage)}
              fit="contain"
              radius="md"
              width="150px"
              alt="Your pets image"
            />
          </Paper>
        </Center>
      )}
      <FileInput
        onChange={upload}
        placeholder="Select image"
        label="Image"
        icon={<IconUpload size="14" />}
      />
    </>
  );
}
