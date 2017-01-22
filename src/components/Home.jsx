import React from 'react';
import { connect } from 'react-redux';

import Forecast from 'Forecast';
import SearchBar from 'SearchBar';
import UnitTypeToggle from 'UnitTypeToggle';
import CurrentLocation from 'CurrentLocation';
import CurrentConditions from 'CurrentConditions';

class Home extends React.Component {
  renderWeatherComponents() {
    if (!this.props.forecast.length) return <p>Nothing atm</p>;

    return (
      <div>
        <CurrentConditions />
        <Forecast />
      </div>
    );
  }

  render() {
    return (
      <div>
        <SearchBar />
        <UnitTypeToggle />
        <CurrentLocation />
        {this.renderWeatherComponents()}
      </div>
    );
  }
}

export default connect(state => {
  return {
    forecast: state.forecast
  };
})(Home);
