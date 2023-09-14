import {
  Button,
  FileInput,
  Grid,
  Image,
  Paper,
  Stack,
  rem,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../hooks/AuthHooks";
import { useUserProfilePictureUpload } from "../hooks/UserHooks";
import { baseProfilePicture } from "../utility/constants";

export default function ProfilePicture() {
  const { user } = useAuth();
  const { postProfilePicture } = useUserProfilePictureUpload();
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const saveFileSelected = (file: File | null) => {
    if (file) setFileSelected(file);
  };
  const upload = () => {
    if (fileSelected) postProfilePicture(fileSelected);
  };

  return (
    <Stack>
      <Paper shadow="xs" p="md">
        <Grid>
          <Grid.Col span={4}>
            <Image
              fit="contain"
              radius="md"
              src={
                user?.picture
                  ? `data:image/png;base64,${user.picture}`
                  : baseProfilePicture
              }
              alt="Your Profile Picture"
            />
            <FileInput
              placeholder="Pick file"
              onChange={saveFileSelected}
              icon={<IconUpload size={rem(14)} />}
            />
          </Grid.Col>
        </Grid>
      </Paper>

      {fileSelected && <Button onClick={upload}>Upload picture</Button>}
    </Stack>
  );
}
