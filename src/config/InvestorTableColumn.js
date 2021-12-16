const investorTableColumn = {
  poolClaim: [
    { field: "id", hide: true },
    { field: "address", headerName: "address", width: 400, editable: true },
    { field: "amountBusd", headerName: "amountBusd", width: 150 },
    { field: "allocationBusd", headerName: "allocationBusd", width: 150 },
    { field: "refunded", headerName: "refunded" },
    { field: "paid", headerName: "paid" },
    { field: "approved", headerName: "approved" },
  ],
  poolRIR: [
    { field: "id", hide: true },
    { field: "address", headerName: "address", width: 400 },
    { field: "amountBusd", headerName: "amountBusd", width: 150 },
    { field: "amountRir", headerName: "amountRir", width: 150 },
    { field: "allocationBusd", headerName: "allocationBusd", width: 150 },
    { field: "allocationRir", headerName: "allocationRir", width: 150 },
    { field: "paid", headerName: "paid" },
    { field: "approved", headerName: "approved" },
  ],
  poolWhitelist: [
    { field: "id", hide: true },
    { field: "address", headerName: "address", width: 400, editable: true },
    { field: "amountBusd", headerName: "amountBusd", width: 150, editable: true },
    { field: "allocationBusd", headerName: "allocationBusd", width: 150, editable: true },
    { field: "paid", headerName: "paid" },
    { field: "approved", headerName: "approved" },
  ],
};

export default investorTableColumn;
