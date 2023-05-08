import { Button, Flex, Image, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../hooks/AuthHooks";
import { userProfilePictureUpload } from "../hooks/UserHooks";
import { baseProfilePicture } from "../utility/constants";

export default function ProfilePicture() {
  const { user } = useAuth();
  const [fileSelected, setFileSelected, postProfilePicture] =
    userProfilePictureUpload();

  const saveFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    setFileSelected(selectedFiles?.[0]);
  };
  const upload = () => {
    postProfilePicture;
  };

  return (
    <Flex direction="column">
      <Image
        borderRadius="lg"
        boxSize="300px"
        objectFit="cover"
        mr="3rem"
        src={
          user?.picture
            ? "data:image/png;base64," + user.picture
            : baseProfilePicture
        }
        alt="Your Profile Picture"
      />
      <input type="file" accept="image/*" onChange={saveFileSelected} />
      <Button onClick={upload}>Upload picture</Button>
    </Flex>
  );
}
