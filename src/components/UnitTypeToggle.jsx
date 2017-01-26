import React from 'react';
import { connect } from 'react-redux';

import { changeUnitType } from 'appActions';

function UnitTypeToggle(props) {
  const {unitType} = props.app;

  return (
    <div>
      <h3>
        <span
          onClick={props.changeUnitType.bind(this, 'imperial')}
          className={
            'toggle ' + (unitType === 'imperial' ? 'toggle--selected' : '')
          }
        >
          F
        </span>
        /
        <span
          onClick={props.changeUnitType.bind(this, 'metric')}
          className={
            'toggle ' + (unitType === 'metric' ? 'toggle--selected' : '')
          }
        >
          C
        </span>
      </h3>
    </div>
  );
}

export default connect(state => {
  return {
    app: state.app
  };
}, { changeUnitType })(UnitTypeToggle);
