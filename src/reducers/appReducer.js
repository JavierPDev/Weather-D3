const defaultState = {
  alert: {},
  location: '',
  unitType: 'imperial',
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
    case 'SET_ALERT':
      return {
        ...state,
        alert: action.alert
      };
    default:
      return state;
  }
}
