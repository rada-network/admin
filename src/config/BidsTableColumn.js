const bidsTableColumn = {
  radaFixedSwap: [
    { field: "id", hide: true, filterable: false },
    { field: "creator", headerName: "address", width: 400 },
    { field: "priceEach", headerName: "price", width: 150, type: "number" },
    { field: "quantity", headerName: "quantity", width: 150, type: "number" },
    { field: "winQuantity", headerName: "winQuantity", width: 150, type: "number" },
  ],

  radaAuction: [
    { field: "id", hide: true, filterable: false },
    { field: "creator", headerName: "address", width: 400 },
    { field: "priceEach", headerName: "price", width: 150, type: "number" },
    { field: "quantity", headerName: "quantity", width: 150, type: "number" },
    { field: "winQuantity", headerName: "winQuantity", width: 150, type: "number" },
    { field: "claimed", headerName: "claimed", width: 150, type: "number" },
  ],

  nftFixedSwap: [
    { field: "id", hide: true, filterable: false },
    { field: "creator", headerName: "address", width: 400 },
    { field: "priceEach", headerName: "price", width: 150, type: "number" },
    { field: "quantity", headerName: "quantity", width: 150, type: "number" },
    { field: "winQuantity", headerName: "winQuantity", width: 150, type: "number" },
  ],

  nftAuction: [
    { field: "id", hide: true, filterable: false },
    { field: "creator", headerName: "address", width: 400 },
    { field: "priceEach", headerName: "price", width: 150, type: "number" },
    { field: "quantity", headerName: "quantity", width: 150, type: "number" },
    { field: "winQuantity", headerName: "winQuantity", width: 150, type: "number" },
    { field: "claimed", headerName: "claimed", width: 150, type: "number" },
  ],
};

export default bidsTableColumn;
