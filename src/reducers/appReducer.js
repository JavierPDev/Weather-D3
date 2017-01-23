const defaultState = {
  unitType: 'imperial'
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return {
        ...state,
        location: action.location
      };
    case 'CHANGE_UNIT_TYPE':
      return {
        ...state,
        unitType: action.unitType
      };
    default:
      return state;
  }
}
