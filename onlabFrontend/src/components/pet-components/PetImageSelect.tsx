import { Carousel } from "@mantine/carousel";
import { FileInput, Image } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { basePetPicture } from "../../utility/constants";

interface IProps {
  petImage?: File[];
  setPetImageFiles(image: File[]): void;
}
export default function PetImageSelect({ petImage, setPetImageFiles }: IProps) {
  const upload = (files: File[]) => {
    setPetImageFiles(files);
  };

  const withIndicatorAndControls = !!petImage && petImage.length > 1;
  return (
    <>
      {!!petImage && petImage.length > 0 && (
        <Carousel
          w="17vw"
          height="17vw"
          mx="auto"
          withIndicators={withIndicatorAndControls}
          withControls={withIndicatorAndControls}
        >
          {petImage?.map((s) => (
            <Carousel.Slide key={s.name}>
              <Image
                src={s ? URL.createObjectURL(s) : basePetPicture}
                radius="md"
                width="17vw"
                height="17vw"
                alt={s.name}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}

      <FileInput
        multiple
        onChange={upload}
        placeholder="Select image"
        label="Image"
        icon={<IconUpload size="14" />}
      />
    </>
  );
}
