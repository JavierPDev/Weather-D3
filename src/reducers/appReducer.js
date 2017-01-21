export default function appReducer(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return {
        ...state,
        location: action.location
      };
    default:
      return state;
  }
}
