import { FileInput, Image, Transition, rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { useUserProfilePictureUpload } from "../../hooks/react-query/UserHooks";
import { baseProfilePicture } from "../../utility/constants";

export interface IPropsProfilePicture {
  picture?: string;
}

export default function ProfilePicture({ picture }: IPropsProfilePicture) {
  const { postProfilePicture } = useUserProfilePictureUpload();
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
    if (file) {
      postProfilePicture(file);
    }
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
        radius="md"
        width="15vw"
        height="15vw"
        src={picture ? `data:image/png;base64,${picture}` : baseProfilePicture}
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
            }}
            onMouseOver={handleMouseOverFileInput}
            onMouseLeave={handleMouseLeaveFileInput}
            radius="md"
            w="15vw"
            placeholder="Pick file"
            onChange={saveFileSelected}
            icon={<IconUpload size={rem(14)} />}
          />
        )}
      </Transition>
    </div>
  );
}
const scaleY = {
  in: { opacity: 1, transform: "scaleY(1)" },
  out: { opacity: 0, transform: "scaleY(0)" },
  common: { transformOrigin: "bottom" },
  transitionProperty: "transform, opacity",
};
