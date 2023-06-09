import { useState } from "react";
import { JobParameters } from "../../models/Job";
import { StatusName } from "../../models/Status";

interface IProp {
  jobFilter: JobParameters;
  setJobFilter(jobParameter: JobParameters): void;
  refetch(): void;
}

const JobFilter: React.FC<IProp> = ({ jobFilter, setJobFilter, refetch }) => {
  const [range, setRange] = useState<number[]>([0, 12]);
  const [value, setValue] = useState(jobFilter.statusName);
  const handleHoursRangeChange = (val: number[]) => {
    setRange(val);
    setJobFilter({
      ...jobFilter,
      jobHoursRange: {
        minHours: range[0],
        maxHours: range[1],
      },
    });
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value as StatusName);
    setJobFilter({
      ...jobFilter,
      statusName: event.target.value as StatusName,
    });
  };
  const handleFilters = () => {
    refetch();
  };
  return (
    <div className="card">
      <CardBody>
        <Flex direction="column" gap="3">
          <Flex direction="column" w="100%">
            <RangeSlider
              aria-label={["min", "max"]}
              defaultValue={[0, 12]}
              min={0}
              minStepsBetweenThumbs={1}
              max={12}
              step={1}
              onChange={handleHoursRangeChange}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Text>
              {range[0]}-{range[1]}
            </Text>
          </Flex>
          <Select onChange={handleSelectChange} value={value}>
            <option value={StatusName.Available}>Available</option>
            <option value={StatusName.WaitingForApproval}>
              Waiting For Approval
            </option>
            <option value={StatusName.Inprogress}>In Progress</option>
          </Select>
          <Button onClick={handleFilters}>Apply filters</Button>
        </Flex>
      </CardBody>
    </div>
  );
};

export default JobFilter;
