import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useRadaAuction } from "providers/RadaAuction";
import { useNavigate, useParams } from "react-router-dom";

const PoolIds = () => {
  const { id } = useParams();
  const { poolIds } = useRadaAuction();

  const navigate = useNavigate();

  const handleChange = ({ key, target }) => {
    navigate(`${process.env.PUBLIC_URL}/radaAuction/${target.value}`);
  };

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

export default PoolIds;
