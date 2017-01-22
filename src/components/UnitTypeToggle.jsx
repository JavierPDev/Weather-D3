import React from 'react';
import { connect } from 'react-redux';

import { changeUnitType } from 'appActions';

class UnitTypeToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  onToggleClick(unitType, e) {
    this.props.dispatch(changeUnitType(unitType));
  }

  getToggleClass(unitType) {
    if (unitType !== this.props.app.unitType) return null;

    return 'toggle--selected';
  }

  render() {
    return (
      <div>
        <h3>
          <span
            onClick={this.onToggleClick.bind(this, 'fahrenheit')}
            className={'toggle '+ this.getToggleClass('fahrenheit')}>
            F
          </span>
          /
          <span
            onClick={this.onToggleClick.bind(this, 'celsius')}
            className={'toggle '+ this.getToggleClass('celsius')}>
            C
          </span>
        </h3>
      </div>
    );
  }
}

export default connect(state => {
  return {
    app: state.app
  };
})(UnitTypeToggle);
