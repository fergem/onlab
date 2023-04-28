import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PetImage } from "../models/Pet";
import ImageUploadService from "../services/ImageUploadService";

interface IProps {
  onOpen(): void;
}
const ImageUpload: React.FC<IProps> = ({ onOpen }) => {
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    console.log(URL.createObjectURL(selectedFiles?.[0]));
    setProgress(0);
  };

  const upload = () => {};

  return (
    <>
      <Flex direction="row">
        <input type="file" accept="image/*" onChange={selectImage} />
      </Flex>

      {previewImage && (
        <div>
          <img className="preview" src={previewImage} alt="" />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
