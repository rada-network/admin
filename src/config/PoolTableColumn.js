import { formatDate } from "utils/format";

const poolTableColumn = {
  poolClaim: [
    { field: "id", hide: true },
    { field: "title", headerName: "title", width: 150 },
    { field: "tokenAddress", headerName: "token Address", width: 400 },
    {
      field: "allocationBusd",
      headerName: "allocationBusd",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "locked",
      headerName: "locked",
      width: 100,
    },
  ],
  poolRIR: [
    { field: "id", hide: true },
    { field: "title", headerName: "title", width: 150 },

    {
      field: "allocationBusd",
      headerName: "allocationBusd",
      width: 130,
    },
    {
      field: "minAllocationBusd",
      headerName: "minAllocationBusd",
      width: 150,
    },
    {
      field: "maxAllocationBusd",
      headerName: "maxAllocationBusd",
      width: 150,
    },
    {
      field: "allocationRir",
      headerName: "allocationRir",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "startDate",
      headerName: "startDate",
      width: 250,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "endDate",
      headerName: "endDate",
      width: 250,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "locked",
      headerName: "locked",
      width: 100,
    },
  ],
  poolWhitelist: [
    { field: "id", hide: true },
    { field: "title", headerName: "title", width: 150 },

    {
      field: "allocationBusd",
      headerName: "allocationBusd",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "startDate",
      headerName: "startDate",
      width: 250,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "endDate",
      headerName: "endDate",
      width: 250,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "locked",
      headerName: "locked",
      width: 100,
    },
  ],
};

export default poolTableColumn;
