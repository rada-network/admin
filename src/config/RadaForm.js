const radaForm = {
  radaFixedSwap: [
    {
      name: "poolId",
      label: "pool ID",
      props: {
        readOnly: true,
      },
    },
    {
      name: "startPrice",
      label: "Start Price",
    },
    {
      name: "addressItem",
      label: "Token Address",
      size: 12,
    },
    {
      name: "addressPayable",
      label: "addressPayable (BUSD/USDT)",
      size: 12,
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
      name: "maxBuyPerOrder",
      label: "Max Buy Per Order",
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
  radaAuction: [
    {
      name: "poolId",
      label: "pool ID",
      props: {
        readOnly: true,
      },
    },
    {
      name: "startPrice",
      label: "Start Price",
    },
    {
      name: "addressItem",
      label: "Token Address",
      size: 12,
    },
    {
      name: "addressPayable",
      label: "addressPayable (BUSD/USDT)",
      size: 12,
    },
    {
      name: "totalItems",
      label: "Total Token Box",
    },
    {
      name: "maxBuyPerAddress",
      label: "Max Buy Per Address",
    },
    {
      name: "requireWhitelist",
      label: "requireWhitelist",
      type: "bool",
    },
    {
      name: "whitelistIds",
      label: "whitelistIds",
      type: "bool",
      multiple: true,
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

  nftFixedSwap: [
    {
      name: "poolId",
      label: "pool ID",
      props: {
        readOnly: true,
      },
    },
    {
      name: "startPrice",
      label: "Start Price",
    },
    {
      name: "addressItem",
      label: "Token Address",
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
      name: "maxBuyPerOrder",
      label: "Max Buy Per Order",
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

  nftAuction: [
    {
      name: "poolId",
      label: "pool ID",
      props: {
        readOnly: true,
      },
    },
    {
      name: "startPrice",
      label: "Start Price",
    },
    {
      name: "addressItem",
      label: "Token Address",
      size: 12,
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

  nftClaim: [
    {
      name: "poolId",
      label: "pool ID",
      props: {
        readOnly: true,
      },
    },
    {
      name: "tokenAddress",
      label: "Token Address",
    },
    {
      name: "tokenPrice",
      label: "Token Price",
    },
    {
      name: "tokenAllocationBusd",
      label: "Token Allocation Busd",
    },
  ],
};

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
      label: "Token Address",
      size: 12,
    },
    {
      name: "addressPayable",
      label: "addressPayable (BUSD/USDT)",
      size: 12,
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
      name: "maxBuyPerOrder",
      label: "Max Buy Per Order",
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

  radaAuction: [
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
      label: "Token Address",
      size: 12,
    },
    {
      name: "addressPayable",
      label: "addressPayable (BUSD/USDT)",
      size: 12,
    },
    {
      name: "totalItems",
      label: "Total Token Box",
    },
    {
      name: "maxBuyPerAddress",
      label: "Max Buy Per Address",
    },
    {
      name: "requireWhitelist",
      label: "requireWhitelist",
      type: "bool",
    },
    {
      name: "whitelistIds",
      label: "whitelistIds",
      type: "bool",
      multiple: true,
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

  nftFixedSwap: [
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
      label: "Token Address",
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
      name: "maxBuyPerOrder",
      label: "Max Buy Per Order",
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

  nftAuction: [
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
      label: "Token Address",
      size: 12,
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

  nftClaim: [
    {
      name: "poolId",
      label: "pool ID",
    },
    {
      name: "tokenAddress",
      label: "Token Address",
    },
    {
      name: "tokenPrice",
      label: "Token Price",
    },
    {
      name: "tokenAllocationBusd",
      label: "Token Allocation Busd",
    },
  ],
};

const radaAppUpdateParams = {
  radaFixedSwap: [
    {
      name: "poolId",
    },
    {
      name: "addressItem",
    },
    {
      name: "addressPayable",
    },
    {
      name: "totalItems",
    },

    {
      name: "startTime",
      type: "date",
    },
    {
      name: "endTime",
      type: "date",
    },
    {
      name: "startPrice",
      type: "ether",
    },
    {
      name: "requireWhitelist",
    },
    {
      name: "maxBuyPerAddress",
    },
    {
      name: "maxBuyPerOrder",
    },
  ],

  radaAuction: [
    {
      name: "poolId",
    },
    {
      name: "addressItem",
    },
    {
      name: "addressPayable",
    },
    {
      name: "totalItems",
    },
    {
      name: "startTime",
      type: "date",
    },
    {
      name: "endTime",
      type: "date",
    },
    {
      name: "startPrice",
      type: "ether",
    },
    {
      name: "requireWhitelist",
    },
    {
      name: "whitelistIds",
    },
    {
      name: "maxBuyPerAddress",
    },
  ],

  nftFixedSwap: [
    {
      name: "poolId",
    },
    {
      name: "addressItem",
    },

    {
      name: "startTime",
      type: "date",
    },
    {
      name: "endTime",
      type: "date",
    },
    {
      name: "startPrice",
      type: "ether",
    },
    {
      name: "requireWhitelist",
    },
    {
      name: "maxBuyPerAddress",
    },
    {
      name: "maxBuyPerOrder",
    },
  ],

  nftAuction: [
    {
      name: "poolId",
    },
    {
      name: "addressItem",
    },

    {
      name: "startTime",
      type: "date",
    },
    {
      name: "endTime",
      type: "date",
    },
    {
      name: "startPrice",
      type: "ether",
    },
    {
      name: "requireWhitelist",
    },
    {
      name: "maxBuyPerAddress",
    },
  ],

  nftClaim: [
    {
      name: "poolId",
    },
    {
      name: "tokenAddress",
    },
    {
      name: "tokenPrice",
      type: "ether",
    },
    {
      name: "tokenAllocationBusd",
      type: "ether",
    },
  ],
};

export { radaAppUpdateParams, radaForm, radaFormAdd };
