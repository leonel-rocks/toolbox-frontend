const files = (state = { data: null }, action) => {
  const { type, data } = action;
  switch (type) {
    case "UPDATE_FILES": {
      return { ...state, data };
    }
    default:
      return state;
  }
};

export default files;
