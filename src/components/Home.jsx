import React from 'react';
import { connect } from 'react-redux';

import Forecast from 'Forecast';
import SearchBar from 'SearchBar';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  renderForecast() {
    if (!this.props.forecast.length) return <p>Nothing atm</p>;

    return <Forecast />;
  }

  render() {
    return (
      <div>
        <SearchBar />
        {this.renderForecast()}
      </div>
    );
  }
}

export default connect(state => {
  return {
    forecast: state.forecast
  };
})(Home);
