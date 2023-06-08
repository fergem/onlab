import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../hooks/AuthHooks";
import { userProfilePictureUpload } from "../hooks/UserHooks";
import { baseProfilePicture } from "../utility/constants";

export default function ProfilePicture() {
  const { user } = useAuth();
  const [postProfilePicture] = userProfilePictureUpload();
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const saveFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    setSelectedFile(selectedFiles?.[0]);
    setImagePreview(URL.createObjectURL(selectedFiles?.[0]));
  };

  const upload = () => {
    if (selectedFile)
      postProfilePicture(selectedFile, {
        onSuccess: () => {
          setImagePreview(undefined);
          toast({
            title: "Profile picture updated",
            description: `Your profile picture has been succesfully updated`,
            status: "success",
          });
        },
        onError: () => {
          toast({
            title: "Profile picture not updated",
            description: `Your profile picture was not updated`,
            status: "error",
          });
        },
      });
  };
  return (
    <Flex direction="column" gap="2">
      <Image
        borderRadius="lg"
        boxSize="300px"
        objectFit="cover"
        mr="3rem"
        src={
          imagePreview
            ? imagePreview
            : user?.picture
            ? "data:image/png;base64," + user.picture
            : baseProfilePicture
        }
        alt="Your Profile Picture"
      />
      <SimpleGrid column={1} spacing={2}>
        <Button>
          Select image
          <Input
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            type="file"
            accept="image/*"
            onChange={saveFileSelected}
          />
        </Button>
        {imagePreview && <Button onClick={upload}>Upload </Button>}
      </SimpleGrid>
    </Flex>
  );
}
