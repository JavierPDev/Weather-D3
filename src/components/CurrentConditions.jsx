import React from 'react';
import { connect } from 'react-redux';

class CurrentConditions extends React.Component {
  renderCurrentConditions() {
    if (!this.props.forecast.length) return <p>Nothing atm</p>;

    return (
      <div className="panel">
        <div>Conditions: {this.props.forecast[0].conditions}</div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderCurrentConditions()}
      </div>
    );
  }
}

export default connect(state => {
  return {
    forecast: state.forecast
  };
})(CurrentConditions);
