import { Button, FileInput, Image, Transition, rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../hooks/AuthHooks";
import { useUserProfilePictureUpload } from "../hooks/UserHooks";
import { baseProfilePicture } from "../utility/constants";

export default function ProfilePicture() {
  const { user } = useAuth();
  const { postProfilePicture } = useUserProfilePictureUpload();
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [hoveredProfile, setHoveredProfile] = useState(false);
  const [hoveredFileInput, setHoveredFileInput] = useState(false);

  const handleMouseOver = () => {
    setHoveredProfile((t) => !t);
  };
  const handleMouseLeave = () => {
    setHoveredProfile((t) => !t);
  };

  const handleMouseOverFileInput = () => {
    setHoveredFileInput((t) => !t);
  };
  const handleMouseLeaveFileInput = () => {
    setHoveredFileInput((t) => !t);
  };

  const saveFileSelected = (file: File | null) => {
    if (file) setFileSelected(file);
  };
  const upload = () => {
    if (fileSelected) postProfilePicture(fileSelected);
  };
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Image
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        fit="contain"
        radius="md"
        src={
          user?.picture
            ? `data:image/png;base64,${user.picture}`
            : baseProfilePicture
        }
        alt="Your Profile Picture"
      />
      <Transition
        mounted={hoveredProfile || hoveredFileInput}
        transition={scaleY}
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <FileInput
            style={{
              ...styles,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onMouseOver={handleMouseOverFileInput}
            onMouseLeave={handleMouseLeaveFileInput}
            radius="md"
            placeholder="Pick file"
            onChange={saveFileSelected}
            icon={<IconUpload size={rem(14)} />}
          />
        )}
      </Transition>

      {fileSelected && <Button onClick={upload}>Upload picture</Button>}
    </div>
  );
}
const scaleY = {
  in: { opacity: 1, transform: "scaleY(1)" },
  out: { opacity: 0, transform: "scaleY(0)" },
  common: { transformOrigin: "bottom" },
  transitionProperty: "transform, opacity",
};
