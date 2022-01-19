import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { radaFormAdd } from "config/RadaForm";
import formGenerator from "utils/form";
import React, { useState, useCallback, useEffect } from "react";
import RadaAuction from "model/RadaAuction";
import { Grid, StepContent } from "@mui/material";
import { useAuction } from "providers/AuctionPools";
import { useActions, useActionState } from "hooks/useActions";
import { parseEther } from "@ethersproject/units";
import { convertUnix } from "utils/format";
import { useGlobal } from "providers/Global";

export default function AuctionPoolsAddContainer() {
  const global = useGlobal();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [formState, setFormState] = useState(RadaAuction({}));
  const { contractType, contractInstance } = useAuction();

  const steps = [
    { label: "Add Pool", type: contractType },
    { label: "Create Openbox", type: "openbox" },
  ];

  const actions = useActions([
    {
      contractInstance: contractInstance,
      func: "addOrUpdatePool",
    },
  ]);

  const [lastAction, success, handleState] = useActionState(actions);

  const handleNext = () => {
    // global.setLoading(true);

    // actions["addOrUpdatePool"].func(
    //   formState.poolId,
    //   formState.addressItem,
    //   formState.totalItems,
    //   `${convertUnix(formState.startTime)}`,
    //   `${convertUnix(formState.endTime)}`,
    //   parseEther(formState.startPrice),
    //   formState.requireWhitelist,
    //   formState.maxBuyPerAddress
    // );

    // handleState("addOrUpdatePool");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    if (success) {
      if (lastAction === "addOrUpdatePool") {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  }, [lastAction, success]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOnchange = useCallback(({ target }) => {
    setFormState((state) => ({ ...state, ...{ [target.name]: target.value } }));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>{step.type}</Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {/* <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
          <Grid container spacing={3}>
            {formGenerator(radaFormAdd[contractType], formState, handleOnchange)}
          </Grid>
        </Box> */}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Add"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
}
