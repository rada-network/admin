import { Button, Stack, TextField } from "@mui/material";
import RadaAuctionAdd from "components/RadaAuction/Add";
import RadaAuctionDetail from "components/RadaAuction/Detail";
import RadaAuctionSettingsButton from "components/RadaAuction/SettingsButton";
import Title from "components/Title";
import { ProvideRadaAuction } from "providers/RadaAuction";
import { useNavigate, useParams } from "react-router-dom";

export default function RadaAuction() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleOnChange = ({ key, target }) => {
    console.log(key, target);
    if (key === "Enter") {
      navigate(`${process.env.PUBLIC_URL}/radaAuction/${target.value}`);
    }
  };

  return (
    <ProvideRadaAuction>
      <Stack direction="row" spacing={2} justifyContent="end">
        <RadaAuctionAdd />
        <RadaAuctionSettingsButton />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginBottom: "1rem" }}>
        <Title>Pool ID:</Title>
        <TextField
          autoComplete="given-name"
          variant="standard"
          onKeyPress={handleOnChange}
          placeholder="poolId"
          defaultValue={id}
        />
      </Stack>

      <RadaAuctionDetail />
    </ProvideRadaAuction>
  );
}
