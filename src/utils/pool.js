import { parseEther } from "@ethersproject/units";
import { convertUnix } from "utils/format";
import { radaAppUpdateParams } from "config/RadaForm";

const argsGenerator = (contractType, formState) => {
  const a = radaAppUpdateParams[contractType].map((field) => {
    switch (field.type) {
      case "date":
        return convertUnix(formState[field.name]);

      case "ether":
        return parseEther(formState[field.name]);

      case "array":
        return Array.isArray(formState[field.name])
          ? formState[field.name]
          : formState[field.name].split(",");

      default:
        return formState[field.name];
    }
  });

  console.log("argsGenerator", a);
  return a;
};

export default argsGenerator;
