import { Button, Group, Stack, Stepper } from "@mantine/core";
import React, { useState } from "react";

export interface StepPropsWithContent {
  title: string;
  content: React.ReactNode;
  stepDisabled: boolean;
  onFinish(): void;
}
export interface IProps {
  steps: StepPropsWithContent[];
}

export const CustomStepper: React.FC<IProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () =>
    setActiveStep((current) =>
      current < steps.length ? current + 1 : current
    );
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current));

  const getNextStepText = () => {
    return activeStep === steps.length ? "Finish" : "Next";
  };

  return (
    <Stack spacing="xs">
      <Stepper
        active={activeStep}
        onStepClick={setActiveStep}
        breakpoint="sm"
        allowNextStepsSelect={false}
        color="indigo"
        iconSize={32}>
        {steps.map((s) => (
          <Stepper.Step key={s.title} label={s.title}>
            {s.content}
          </Stepper.Step>
        ))}
      </Stepper>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>{getNextStepText()}</Button>
      </Group>
    </Stack>
  );
};
