import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

import { useWhitelist } from "providers/Whitelist";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WhitelistList = () => {
  const { id } = useParams();
  const { listId, contractInstance } = useWhitelist();
  const [titles, setTitles] = useState([]);

  const navigate = useNavigate();

  const handleChange = ({ key, target }) => {
    navigate(`${process.env.PUBLIC_URL}/whitelist/${target.value}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const titles = await Promise.all(
        listId.map(async (item) => {
          try {
            return await contractInstance.listTitle(item);
          } catch (error) {
            return null;
          }
        })
      );

      setTitles(titles);
    };
    fetchData();
  }, [JSON.stringify(listId)]);

  if (listId.length === 0 || id === "add") {
    return "";
  }

  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: "1rem" }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="poolIds-label">ListId</InputLabel>
        <Select labelId="poolIds-label" label="PoolId" value={id} onChange={handleChange}>
          {listId.map((item, i) => (
            <MenuItem value={item}>
              {item} - {titles[i]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default WhitelistList;
