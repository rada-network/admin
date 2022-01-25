import { parseEther, parseUnits } from "@ethersproject/units";
import { convertUnix } from "utils/format";
import { radaAppUpdateParams } from "config/RadaForm";
import { getDecimals } from "hooks/useDecimals";

const argsGenerator = async (contractType, formState) => {
  const { addressPayableDecimals, tokenPriceDecimals } = await getDecimals(
    formState.addressPayable,
    formState.tokenAddress
  );

  const args = radaAppUpdateParams[contractType].map((field) => {
    switch (field.type) {
      case "date":
        return convertUnix(formState[field.name]);

      case "ether":
        if (field.name === "startPrice" || field.name === "tokenAllocationBusd") {
          return parseUnits(formState[field.name], addressPayableDecimals);
        }

        if (field.name === "tokenPrice") {
          return parseUnits(formState[field.name], tokenPriceDecimals);
        }

        return parseEther(formState[field.name]);

      case "array":
        return Array.isArray(formState[field.name])
          ? formState[field.name]
          : formState[field.name].split(",");

      default:
        return formState[field.name];
    }
  });

  console.log("argsGenerator", args);
  return args;
};

export default argsGenerator;
