import { formatNumber } from "utils/format";

const winnerTableColumn = {
  poolClaim: [
    { field: "address", headerName: "address", width: 400 },
    {
      field: "amountBusd",
      headerName: "amountBusd",
      width: 150,
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
    {
      field: "allocationBusd",
      headerName: "allocationBusd",
      width: 150,
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
    {
      field: "claimedToken",
      headerName: "claimedToken",
      width: 150,
      valueGetter: (params) => formatNumber(params.value),
    },
    { field: "refunded", headerName: "refunded" },
  ],
  poolRIR: [
    { field: "address", headerName: "address", width: 400 },
    {
      field: "allocationBusd",
      headerName: "allocationBusd",
      width: 150,
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
    {
      field: "allocationRir",
      headerName: "allocationRir",
      width: 150,
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
  ],
  poolWhitelist: [
    { field: "address", headerName: "address", width: 400 },
    {
      field: "amountBusd",
      headerName: "amountBusd",
      width: 150,
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
    {
      field: "allocationBusd",
      headerName: "allocationBusd",
      width: 150,
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
  ],
};

export default winnerTableColumn;
