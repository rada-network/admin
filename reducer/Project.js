const projectReducer = (state, action) => {
  console.log("projectReducer", state, action.type);

  switch (action.type) {
    case "importWhitelist":
      return { ...state, ...{ whistList: "qq" } };

    case "loading":
      return { ...state, ...{ loading: true } };

    case "loaded":
      return { ...state, ...{ loading: false } };

    default:
      break;
  }
};

export default projectReducer;
