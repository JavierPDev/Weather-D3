export default function selectConditionsReducer(state = {}, action) {
  switch (action.type) {
    case 'SELECT_CONDITIONS':
      return action.selectedConditions;
    default:
      return state;
  }
}
