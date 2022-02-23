import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useRada } from "providers/Rada";
import { useNavigate, useParams } from "react-router-dom";
import { formatUnits } from "@ethersproject/units";
const PoolIds = () => {
  const { type, id } = useParams();
  const { poolIds } = useRada();

  const navigate = useNavigate();

  const handleChange = ({ key, target }) => {
    navigate(`${process.env.PUBLIC_URL}/rada/${type}/${target.value}`);
  };

  if (poolIds.length === 0) {
    return "";
  }

  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: "1rem" }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="poolIds-label">PoolId</InputLabel>
        <Select labelId="poolIds-label" label="PoolId" value={id} onChange={handleChange}>
          {poolIds.map((item, i) => (
            <MenuItem key={i} value={item}>
              {formatUnits(item, 0)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default PoolIds;
