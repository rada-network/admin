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
    name: "isSaleToken",
    label: "Token or NFT",
    type: "bool",
    options: [
      { label: "Token", value: true },
      { label: "NFT", value: false },
    ],
  },
  {
    name: "requireWhitelist",
    label: "requireWhitelist",
    type: "bool",
  },
];

export default radaForm;

const radaFormAdd = [
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
    name: "isSaleToken",
    label: "Token or NFT",
    type: "bool",
    options: [
      { label: "Token", value: true },
      { label: "NFT", value: false },
    ],
  },

  {
    name: "nftAddress",
    label: "NFT Contract",
  },
];

export { radaFormAdd };
