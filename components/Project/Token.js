import { useContractBEP20, useContractFunction } from "@hooks/useContract";
import { useProject } from "@hooks/useProject";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { parseEther } from "@ethersproject/units";
import { toast } from "react-toastify";
import { useAuth } from "@hooks/useAuth";

const Token = () => {
  const auth = useAuth();
  const projectData = useProject();

  const [tokenAddress, changeTokenAddress] = useState(projectData.tokenAddress);
  const [tokenAmount, setTokenAmount] = useState(0);

  const [stateSetToken, setTokenAddress] = useContractFunction(
    projectData.contractInstance,
    "setTokenAddress"
  );

  const [stateCommitToken, commitTokenAddress] = useContractFunction(
    projectData.contractInstance,
    "commitTokenAddress"
  );

  const [stateDeposit, deposit] = useContractFunction(projectData.contractInstance, "deposit");

  const tokenInstance = useContractBEP20(projectData.tokenAddress);
  const [stateApprove, approve] = useContractFunction(tokenInstance, "approve");

  const handleStatus = async (state) => {
    switch (state.status) {
      case "Success":
        auth.setLoading(false);
        break;
      case "Mining":
        auth.setLoading(true);
        break;
      case "Exception":
        toast(state.errorMessage);
        auth.setLoading(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleStatus(stateSetToken);
  }, [stateSetToken]);

  useEffect(() => {
    handleStatus(stateCommitToken);
  }, [stateCommitToken]);

  useEffect(() => {
    handleStatus(stateApprove);
  }, [stateApprove]);

  useEffect(() => {
    handleStatus(stateDeposit);
  }, [stateDeposit]);

  const handleSetTokenAddress = () => {
    if (tokenAddress) {
      auth.setLoading(true);
      setTokenAddress(tokenAddress);
    }
  };

  const handleApprove = () => {
    if (tokenAmount > 0) {
      auth.setLoading(true);
      console.log(projectData.contract, parseEther(tokenAmount));
      approve(projectData.contract, parseEther(tokenAmount));
    }
  };

  const handleDeposit = () => {
    if (tokenAmount > 0) {
      auth.setLoading(true);
      deposit(parseEther(tokenAmount));
    }
  };

  const handleCommitToken = () => {
    auth.setLoading(true);
    commitTokenAddress();
  };

  console.log("Project Detail Token render", projectData, tokenAddress);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6" gutterBottom>
              Token address
            </Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              value={tokenAddress}
              disabled={tokenAddress ? true : false}
              fullWidth={true}
              onChange={(e) => changeTokenAddress(e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              disabled={projectData.isOwner ? false : false}
              variant="contained"
              onClick={handleSetTokenAddress}
            >
              Import Token Adrress
            </Button>
            <Button
              disabled={projectData.isOwner ? false : true}
              variant="contained"
              onClick={handleCommitToken}
            >
              Commit Token Adrress
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6" gutterBottom>
              Deposit Token Amount
            </Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              value={tokenAmount}
              fullWidth={true}
              onChange={(e) => setTokenAmount(e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              disabled={projectData.isCommit ? true : projectData.isOwner ? false : true}
              variant="contained"
              onClick={handleApprove}
            >
              Approve Contract
            </Button>
            <Button
              disabled={projectData.isCommit ? true : projectData.isOwner ? false : true}
              variant="contained"
              onClick={handleDeposit}
            >
              Deposit Token
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Token;
