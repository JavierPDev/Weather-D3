import React from 'react';
import { connect } from 'react-redux';

class SelectedConditions extends React.Component {
  renderSelectedConditions() {
    const {selectedConditions} = this.props;

    if (!selectedConditions.high) return <p>No results</p>;

    const {unitType} = this.props.app;
    const tempUnit = unitType === 'imperial' ? 'fahrenheit' : 'celsius';
    const windUnit = unitType === 'imperial' ? 'mph' : 'kph';
    const precipUnit = unitType === 'imperial' ? 'in' : 'mm';
    const degrees = tempUnit === 'fahrenheit' ? '° F' : '° C';

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-3">
              <center>
                <img width="75" height="75" src={selectedConditions.icon_url} />
                <br />
                <small>
                  {selectedConditions.conditions}
                </small>
              </center>
            </div>
            <div className="col-sm-3">
              <h4>{selectedConditions.date.weekday}</h4>
              <h3>
                <small>HI</small>&nbsp;
                {selectedConditions.high[tempUnit] + degrees}
              </h3>
              <h5>
                <small>LO</small>&nbsp;
                {selectedConditions.low[tempUnit] + degrees}
              </h5>
            </div>
            <div className="col-sm-3">
              <h4 className="selected-conditions-heading">Wind</h4>
              <h5>
                <small>MAX</small>&nbsp;
                {selectedConditions.maxwind[windUnit] + windUnit}
              </h5>
              <h5>
                <small>AVG</small>&nbsp;
                {selectedConditions.avewind[windUnit] + windUnit}
              </h5>
            </div>
            <div className="col-sm-3">
              <h4 className="selected-conditions-heading">H2O</h4>
              <h5>
                <small>PRECIP</small>&nbsp;
                {selectedConditions.qpf_allday[precipUnit] + precipUnit}
              </h5>
              <h5>
                <small>HUMID</small>&nbsp;
                {selectedConditions.avehumidity}%
              </h5>
            </div>
          </div>
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
