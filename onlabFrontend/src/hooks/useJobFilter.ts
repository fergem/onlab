import { DatesRangeValue, DateValue } from "@mantine/dates";
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
    if (realValue === Frequency.Once) {
      setJobFilter({ ...jobFilter, repeated: false, days: [] });
    } else if (realValue === Frequency.Repeat) {
      setJobFilter({ ...jobFilter, repeated: true });
    }
  };

  const handleSelectDate = (value: DatesRangeValue | DateValue) => {
    if (Array.isArray(value) && value.length === 2 && value[0] && value[1]) {
      setJobFilter({ ...jobFilter, startDate: value[0], endDate: value[1] });
    } else if (!Array.isArray(value) && value) {
      setJobFilter({ ...jobFilter, startDate: value, endDate: undefined });
    }
  };

  return {
    handleSelectDays,
    handleSelectJobType,
    handleSelectRepeatable,
    handleSelectPetSpecies,
    handleSelectDate,
  };
}
