export function changeLocation(location) {
  return {
    type: 'CHANGE_LOCATION',
    location
  };
}

export function changeUnitType(unitType) {
  return {
    type: 'CHANGE_UNIT_TYPE',
    unitType
  };
}

export function setAlert({type, message}) {
  return {
    type: 'SET_ALERT',
    alert: {type, message}
  };
}
