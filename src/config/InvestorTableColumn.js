import { formatNumber } from "utils/format";

const investorTableColumn = {
  poolClaim: [
    { field: "id", hide: true, filterable: false },
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
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
    { field: "refunded", headerName: "refunded" },
    { field: "paid", headerName: "paid" },
    { field: "approved", headerName: "approved" },
  ],
  poolRIR: [
    { field: "id", hide: true, filterable: false },
    { field: "address", headerName: "address", width: 400 },
    {
      field: "amountBusd",
      headerName: "amountBusd",
      width: 150,
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
    {
      field: "amountRir",
      headerName: "amountRir",
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
      field: "allocationRir",
      headerName: "allocationRir",
      width: 150,
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
    {
      field: "claimedToken",
      headerName: "claimedToken",
      width: 150,
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
    { field: "paid", headerName: "paid" },
    { field: "approved", headerName: "approved" },
  ],
  poolWhitelist: [
    { field: "id", hide: true, filterable: false },
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
      type: "number",
      valueGetter: (params) => formatNumber(params.value),
    },
    { field: "paid", headerName: "paid" },
    { field: "approved", headerName: "approved" },
  ],
};

export default investorTableColumn;
