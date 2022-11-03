const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "FILL_CART":
      return [...action.payload];

    default:
      return state;
  }
};

export default cartReducer;
