import { formatDate } from "utils/format";

const poolTableColumn = [
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
];

export default poolTableColumn;
