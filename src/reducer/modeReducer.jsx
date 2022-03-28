const modeReducer = (state = null, action) => {
  switch (action.type) {
    case "DARK":
      return "dark";
      break;
    default:
      return "light";
  }
};

export default modeReducer;
