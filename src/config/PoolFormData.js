const poolFormData = [
  {
    name: "title",
    label: "Title",
    readOnly: true,
    size: 12,
  },
  {
    name: "allocationBusd",
    label: "allocationBusd",
  },
  {
    name: "minAllocationBusd",
    label: "minAllocationBusd",
    readOnly: true,
  },
  {
    name: "maxAllocationBusd",
    label: "maxAllocationBusd",
    readOnly: true,
  },
  {
    name: "allocationRir",
    label: "allocationRir",
    readOnly: true,
  },
  {
    name: "price",
    label: "priceToken",
  },
  {
    name: "fee",
    label: "fee",
    readOnly: true,
  },
  {
    name: "startDate",
    label: "startDate",
    type: "date",
  },
  {
    name: "endDate",
    label: "endDate",
    type: "date",
  },

  {
    name: "tokenAddress",
    label: "tokenAddress",
    readOnly: true,
    edit: true,
  },

  {
    name: "depositAmount",
    label: "depositAmount",
    readOnly: true,
    edit: true,
  },
];

export default poolFormData;
