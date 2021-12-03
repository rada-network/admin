import getContract from "utils/contact";

const projectReducer = (state, action) => {
  console.log("projectReducer", state, action.type);

  switch (action.type) {
    case "importWhitelist":
      return { ...state, ...{ whistList: "qq" } };
    default:
      break;
  }
};

export default projectReducer;
