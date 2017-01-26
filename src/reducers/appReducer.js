const defaultState = {
  alert: {},
  location: '',
  unitType: 'imperial',
  tooltip: {}
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
    case 'SET_TOOLTIP':
      return {
        ...state,
        tooltip: action.tooltip
      };
    default:
      return state;
  }
}
