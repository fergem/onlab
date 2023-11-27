import { DateValue } from "@mantine/dates";
import { Day, Frequency, JobFilter, JobType } from "../models/Job";
import { PetSpecies } from "../models/Pet";

interface IPropsJobFilterHooks {
  jobFilter: JobFilter;
  setJobFilter(jobFilter: JobFilter): void;
}
export const JobFilterLocalStorageKey = "job_filter_key";

export default function useJobFilter({
  jobFilter,
  setJobFilter,
}: IPropsJobFilterHooks) {
  const handleSelectDays = (values: string[]) =>
    setJobFilter({ ...jobFilter, days: values as Day[] });

  const handleSelectJobType = (values: string[]) => {
    const newValues = values as JobType[];
    if (
      newValues.includes(JobType.Boarding) ||
      newValues.includes(JobType.Sitting)
    ) {
      setJobFilter({ ...jobFilter, types: newValues, repeated: false });
    } else if (newValues.length === 0) {
      setJobFilter({ ...jobFilter, types: newValues, repeated: false });
    } else {
      setJobFilter({ ...jobFilter, types: newValues });
    }
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
    jobFilter,
    handleSelectDays,
    handleSelectJobType,
    handleSelectRepeatable,
    handleSelectPetSpecies,
    handleSelectStartDate,
    handleSelectEndDate,
  };
}
