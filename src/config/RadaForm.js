const radaForm = [
  {
    name: "poolId",
    label: "pool ID",
  },
  {
    name: "startPrice",
    label: "Start Price",
  },
  {
    name: "addressItem",
    label: "Token/NFT Address",
  },
  {
    name: "maxBuyPerAddress",
    label: "maxBuyPerAddress",
  },
  {
    name: "startId",
    label: "startId",
  },
  {
    name: "endId",
    label: "endId",
  },
  {
    name: "startTime",
    label: "startTime",
    type: "date",
  },
  {
    name: "endTime",
    label: "endTime",
    type: "date",
  },

  {
    name: "requireWhitelist",
    label: "requireWhitelist",
    type: "bool",
  },
];

export default radaForm;

const radaFormAdd = {
  radaFixedSwap: [
    {
      name: "poolId",
      label: "pool ID",
    },
    {
      name: "startPrice",
      label: "Start Price",
    },
    {
      name: "addressItem",
      label: "Token Box Address",
    },
    {
      name: "totalItems",
      label: "Total Token Box",
    },

    {
      name: "requireWhitelist",
      label: "requireWhitelist",
      type: "bool",
    },
    {
      name: "maxBuyPerAddress",
      label: "Max Buy Per Address",
    },
    {
      name: "startTime",
      label: "startTime",
      type: "date",
    },
    {
      name: "endTime",
      label: "endTime",
      type: "date",
    },
  ],

  openbox: [],
};

export { radaFormAdd };
