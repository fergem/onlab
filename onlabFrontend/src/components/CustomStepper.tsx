import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Container,
} from "@mui/material";
import React, { useState } from "react";

export interface StepPropsWithContent {
  title: string;
  content: React.ReactNode;
}
interface IProps {
  steps: StepPropsWithContent[];
}

export const CustomStepper: React.FC<IProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep <= steps.length)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container disableGutters sx={{ padding: "3%", minWidth: "50vw" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((s) => {
          return (
            <Step key={s.title}>
              <StepLabel>{s.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        {steps[activeStep].content}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Container>
  );
};
