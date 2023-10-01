import { Badge, Select } from "@mantine/core";
import {
  JobFilterParticipant,
  JobFilterParticipantData,
  Status,
} from "../models/Job";

interface IPropsStatusBadge {
  filter: JobFilterParticipant;
  setFilter(filter: JobFilterParticipant): void;
}

export default function StatusBadge({ filter, setFilter }: IPropsStatusBadge) {
  const handleSetStatus = (status: Status) => {
    setFilter({ ...filter, status });
  };
  return (
    <Badge size="xl" variant="filled">
      <Select
        data={JobFilterParticipantData}
        value={filter.status}
        onChange={handleSetStatus}
        // label="Type of job"
        // placeholder="Pick type"
        radius="md"
        transitionProps={{
          transition: "pop-top-left",
          duration: 80,
          timingFunction: "ease",
        }}
      />
    </Badge>
  );
}
