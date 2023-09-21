import { DateValue } from "@mantine/dates";
import { Day, Frequency, JobFilter, JobType } from "../models/Job";
import { PetSpecies } from "../models/Pet";

interface IPropsJobFilterHooks {
  jobFilter: JobFilter;
  setJobFilter(jobFilter: JobFilter): void;
}

export default function useJobFilter({
  jobFilter,
  setJobFilter,
}: IPropsJobFilterHooks) {
  const handleSelectDays = (values: string[]) =>
    setJobFilter({ ...jobFilter, days: values as Day[] });

  const handleSelectJobType = (value: string) => {
    const jobType = value as JobType;
    setJobFilter({
      ...jobFilter,
      type: jobType,
      repeated:
        !(jobType === JobType.Sitting || jobType === JobType.Boarding) &&
        jobFilter.repeated,
    });
  };

  const handleSelectPetSpecies = (value: string[]) =>
    setJobFilter({ ...jobFilter, species: value as PetSpecies[] });

  const handleSelectRepeatable = (value: string) => {
    const realValue = value as Frequency;
    switch (realValue) {
      case Frequency.Once:
        setJobFilter({ ...jobFilter, repeated: false, days: [] });
        break;
      case Frequency.Repeat:
        setJobFilter({ ...jobFilter, repeated: true });
        break;
      default: // should not happen
        break;
    }
  };

  const handleSelectStartDate = (value: DateValue) => {
    if (value) setJobFilter({ ...jobFilter, startDate: value });
  };

  const handleSelectEndDate = (value: DateValue) => {
    setJobFilter({ ...jobFilter, endDate: value ?? undefined });
  };

  return {
    handleSelectDays,
    handleSelectJobType,
    handleSelectRepeatable,
    handleSelectPetSpecies,
    handleSelectStartDate,
    handleSelectEndDate,
  };
}
