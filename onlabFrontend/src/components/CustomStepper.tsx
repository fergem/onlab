import { Button, Group, Stack, Stepper } from "@mantine/core";
import React, { useState } from "react";

export interface StepPropsWithContent {
  title: string;
  content: React.ReactNode;
  stepDisabled?: boolean;
  onNext?: () => void;
  onFinish?: () => void;
}
export interface IProps {
  steps: StepPropsWithContent[];
  onFinal: () => void;
}

export default function CustomStepper({ steps, onFinal }: IProps) {
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () => {
    steps[activeStep].onNext?.();
    setActiveStep((current) =>
      current < steps.length ? current + 1 : current
    );
  };
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current));

  const handleOnFinish = () => {
    steps[activeStep].onFinish?.();
    onFinal();
  };
  return (
    <Stack spacing="xs">
      <Stepper
        active={activeStep}
        onStepClick={setActiveStep}
        breakpoint="sm"
        allowNextStepsSelect={false}
        color="indigo"
        iconSize={32}
      >
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
        {activeStep !== steps.length - 1 ? (
          <Button onClick={nextStep} disabled={steps[activeStep].stepDisabled}>
            Next
          </Button>
        ) : (
          <Button
            onClick={handleOnFinish}
            disabled={steps[activeStep].stepDisabled ?? false}
          >
            Finish
          </Button>
        )}
      </Group>
    </Stack>
  );
}
