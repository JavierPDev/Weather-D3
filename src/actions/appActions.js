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
    alert: {
      type,
      message
    }
  };
}

export function setTooltip({x, y, contentElement, originTarget, title}) {
  return {
    type: 'SET_TOOLTIP',
    tooltip: {
      x,
      y,
      contentElement,
      originTarget,
      title
    }
  };
}

export function hideTooltip() {
  return {
    type: 'SET_TOOLTIP',
    tooltip: {}
  };
}
