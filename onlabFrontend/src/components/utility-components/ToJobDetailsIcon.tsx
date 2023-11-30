import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export interface IToJobDetailsIconProps {
  jobID: number;
}

export default function ToJobDetailsIcon({ jobID }: IToJobDetailsIconProps) {
  const navigate = useNavigate();
  const handleNavigate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/jobs/${jobID}`);
  };
  return (
    <Tooltip label="To details page">
      <ActionIcon onClick={handleNavigate} color="dark">
        <IconArrowNarrowRight />
      </ActionIcon>
    </Tooltip>
  );
}
