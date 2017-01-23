import React from 'react';
import { connect } from 'react-redux';

class SelectedConditions extends React.Component {
  renderSelectedConditions() {
    const {selectedConditions} = this.props;
    console.log(selectedConditions);

    if (!selectedConditions.high) return <p>Nothing atm</p>;

    const {unitType} = this.props.app;
    const tempUnit = unitType === 'imperial' ? 'fahrenheit' : 'celsius';
    const windUnit = unitType === 'imperial' ? 'mph' : 'kph';
    const precipUnit = unitType === 'imperial' ? 'in' : 'mm';
    const degrees = tempUnit === 'fahrenheit' ? '° F' : '° C';

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div>
            {selectedConditions.date.weekday}
          </div>
          <div>
            Conditions: {selectedConditions.conditions}
          </div>
          <div>
            High: {selectedConditions.high[tempUnit] + degrees}
          </div>
          <div>
            Low: {selectedConditions.low[tempUnit] + degrees}
          </div>
          <div>
            Maxwind: {selectedConditions.maxwind[windUnit] + windUnit}
          </div>
          <div>
            Precipitation: {
              selectedConditions.qpf_allday[precipUnit] + precipUnit
            }
          </div>
          <div>
            Humidity: {selectedConditions.avehumidity}%
          </div>
          <img src={selectedConditions.icon_url} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSelectedConditions()}
      </div>
    );
  }
}

export default connect(state => {
  return {
    app: state.app,
    selectedConditions: state.selectedConditions
  };
})(SelectedConditions);
