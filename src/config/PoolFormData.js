// const poolFormData = {
//   poolClaim: [
//     {
//       name: "title",
//       label: "Title",
//     },
//     {
//       name: "tokenAddress",
//       label: "tokenAddress",
//     },
//     {
//       name: "allocationBusd",
//       label: "allocationBusd",
//     },
//     {
//       name: "minAllocationBusd",
//       label: "minAllocationBusd",
//     },
//     {
//       name: "maxAllocationBusd",
//       label: "maxAllocationBusd",
//     },
//     {
//       name: "allocationRir",
//       label: "allocationRir",
//     },
//     {
//       name: "price",
//       label: "priceToken",
//     },
//     {
//       name: "fee",
//       label: "fee",
//     },
//     {
//       name: "startDate",
//       label: "startDate",
//       type: "date",
//     },
//     {
//       name: "endDate",
//       label: "endDate",
//       type: "date",
//     },
//   ],
//   poolRIR: [
//     {
//       name: "title",
//       label: "Title",
//     },
//     {
//       name: "tokenAddress",
//       label: "tokenAddress",
//     },
//     {
//       name: "allocationBusd",
//       label: "allocationBusd",
//     },
//     {
//       name: "minAllocationBusd",
//       label: "minAllocationBusd",
//     },
//     {
//       name: "maxAllocationBusd",
//       label: "maxAllocationBusd",
//     },
//     {
//       name: "allocationRir",
//       label: "allocationRir",
//     },
//     {
//       name: "price",
//       label: "priceToken",
//     },
//     {
//       name: "fee",
//       label: "fee",
//     },

//     {
//       name: "startDate",
//       label: "startDate",
//       type: "date",
//     },
//     {
//       name: "endDate",
//       label: "endDate",
//       type: "date",
//     },
//   ],
//   poolWhitelist: [
//     {
//       name: "title",
//       label: "Title",
//     },
//     {
//       name: "allocationBusd",
//       label: "allocationBusd",
//     },
//     {
//       name: "price",
//       label: "price",
//     },
//     {
//       name: "startDate",
//       label: "startDate",

//       type: "date",
//     },
//     {
//       name: "endDate",
//       label: "endDate",
//       type: "date",
//     },
//   ],
// };

const poolFormData = [
  {
    name: "title",
    label: "Title",
  },
  {
    name: "locked",
    label: "locked",
    readOnly: true,
  },
  {
    name: "allocationBusd",
    label: "allocationBusd",
  },
  {
    name: "minAllocationBusd",
    label: "minAllocationBusd",
  },
  {
    name: "maxAllocationBusd",
    label: "maxAllocationBusd",
  },
  {
    name: "allocationRir",
    label: "allocationRir",
  },
  {
    name: "price",
    label: "priceToken",
  },
  {
    name: "fee",
    label: "fee",
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
];

export default poolFormData;
