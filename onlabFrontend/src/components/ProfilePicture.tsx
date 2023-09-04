import { Button, FileInput, Stack, Image, rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useAuth } from "../hooks/AuthHooks";
import { userProfilePictureUpload } from "../hooks/UserHooks";
import { baseProfilePicture } from "../utility/constants";

export default function ProfilePicture() {
  const { user } = useAuth();
  const { fileSelected, setFileSelected, postProfilePicture } =
    userProfilePictureUpload();

  const saveFileSelected = (file: File | null) => {
    setFileSelected(file);
  };
  const upload = () => {
    postProfilePicture();
  };

  return (
    <Stack>
      <Image
        fit="contain"
        radius="md"
        maw="200px"
        miw="200px"
        height="200px"
        src={
          user?.picture
            ? "data:image/png;base64," + user.picture
            : baseProfilePicture
        }
        alt="Your Profile Picture"
      />
      <FileInput
        placeholder="Pick file"
        onChange={saveFileSelected}
        icon={<IconUpload size={rem(14)} />}
      />
      {fileSelected && <Button onClick={upload}>Upload picture</Button>}
    </Stack>
  );
}
