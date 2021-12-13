const investorTableColumn = {
  poolClaim: [
    { field: "id", hide: true },
    { field: "address", headerName: "Address", width: 250 },
    { field: "amountBusd", headerName: "amountBusd", width: 150 },
    { field: "allocationBusd", headerName: "allocationBusd", width: 150 },
    { field: "approved", headerName: "approved" },
    { field: "refunded", headerName: "refunded" },
  ],
  poolRIR: [
    { field: "id", hide: true },
    { field: "address", headerName: "Address", width: 250 },
    { field: "amountBusd", headerName: "amountBusd", width: 150 },
    { field: "allocationBusd", headerName: "allocationBusd", width: 150 },
    { field: "allocationRirs", headerName: "allocationRirs", width: 150 },
    { field: "paid", headerName: "paid" },
    { field: "approved", headerName: "approved" },
  ],
  poolWhitelist: [
    { field: "id", hide: true },
    { field: "address", headerName: "Address", width: 250 },
    { field: "amountBusd", headerName: "amountBusd", width: 150 },
    { field: "allocationBusd", headerName: "allocationBusd", width: 150 },
    { field: "approved", headerName: "approved" },
  ],
};

export default investorTableColumn;
