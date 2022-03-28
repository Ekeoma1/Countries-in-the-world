const modeReducer = (state = null, action) => {
  switch (action.type) {
    case "DARK":
      return "dark";
    default:
      return "light";
  }
};

export default modeReducer;
