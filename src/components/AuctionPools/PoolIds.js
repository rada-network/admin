import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useAuction } from "providers/AuctionPools";

import { useNavigate, useParams } from "react-router-dom";

const AuctionPoolsPoolIds = () => {
  const { type, id } = useParams();
  const { poolIds } = useAuction();

  const navigate = useNavigate();

  const handleChange = ({ key, target }) => {
    navigate(`${process.env.PUBLIC_URL}/auction/${type}/${target.value}`);
  };

  if (poolIds.length === 0) {
    return "";
  }

  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: "1rem" }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="poolIds-label">PoolId</InputLabel>
        <Select labelId="poolIds-label" label="PoolId" value={id} onChange={handleChange}>
          {poolIds.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default AuctionPoolsPoolIds;
