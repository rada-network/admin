import { Box, Stack } from "@mui/material";
import { formatNumber } from "utils/format";

const PoolInvestorsTotal = (props) => {
  if (!props.investors) {
    return <></>;
  }

  const getTotal = (field) => {
    switch (field) {
      case "address":
        return props.investors.length;
      case "id":
        return "hide";

      case "approved":
      case "paid":
      case "refunded":
        return props.investors.filter((row) => row[field]).length;

      default:
        return formatNumber(props.investors.reduce((acc, val) => acc + parseInt(val[field]), 0));
    }
  };

  const t = props.columns
    .map((column) => ({
      column: column.field,
      value: getTotal(column.field),
    }))
    .filter((row) => row.value !== "hide");

  console.log("PoolInvestorsTotal render", props);

  return (
    <Box>
      <Stack direction="row" spacing={3} sx={{ marginBottom: "1rem" }}>
        {t.map((row) => (
          <div>
            {row.column}: {row.value}
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export default PoolInvestorsTotal;
