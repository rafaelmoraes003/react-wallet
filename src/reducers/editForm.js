const INITIAL_STATE = {
  enableToEditForm: false,
  id: 0,
};

const editForm = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EDIT_FORM':
    return {
      ...state,
      enableToEditForm: !state.enableToEditForm,
      id: action.payload,
    };
  default:
    return state;
  }
};

export default editForm;
