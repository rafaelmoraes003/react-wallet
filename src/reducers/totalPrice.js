const INITIAL_STATE = {
  total: [],
};

const totalPrice = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'TOTAL_PRICE':
    return {
      total: [...state.total, action.payload],
    };
  default:
    return state;
  }
};

export default totalPrice;
