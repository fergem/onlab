import {
  Card,
  CardBody,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface IProp {
  setHoursRangeFilter(range: string): void;
  refetch(): void;
}

const JobFilter: React.FC<IProp> = ({ setHoursRangeFilter, refetch }) => {
  const [range, setRange] = useState<number[]>([0, 12]);
  const handleHoursRangeChange = (val: number[]) => {
    setRange(val);
    if (range[0] > 0 && range[1] < 12)
      setHoursRangeFilter(`minHours=${range[0]}&maxHours=${range[1]}`);
    else if (range[0] > 0) setHoursRangeFilter(`minHours=${range[0]}`);
    else if (range[1] < 12) setHoursRangeFilter(`maxHours=${range[1]}`);
    else setHoursRangeFilter("");
    refetch();
  };
  return (
    <Card boxSize="20%">
      <CardBody>
        <Text>
          {range[0]}-{range[1]}
        </Text>
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
      </CardBody>
    </Card>
  );
};

export default JobFilter;
