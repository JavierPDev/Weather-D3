import React from 'react';
import { connect } from 'react-redux';

import { getForecast } from '../api/forecast';
import { forecastRetrievalCompleted } from 'forecastActions';
import { changeLocation } from 'appActions';
import { selectConditions } from 'selectConditionsActions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  transformLocation(input) {
    input = input.split(/(,\s)|(,)/);
    const cityInput = input[0].replace(' ', '_');
    const city = cityInput[0].toUpperCase()
      + cityInput.slice(1, cityInput.length).toLowerCase();
    const state = input[3].length === 2 ? input[3].toUpperCase()
      : input[3][0].toUpperCase()
        + input[3].slice(1, input[3].length).toLowerCase();

    return {city, state};
  }

  handleSubmit(e) {
    e.preventDefault();

    const {city, state} = this.transformLocation(this.state.search);

    getForecast(city, state)
      .then(forecast => {
        this.props.dispatch(changeLocation(city+', '+state));
        this.props.dispatch(selectConditions(forecast[0]));
        this.props.dispatch(forecastRetrievalCompleted(forecast));
        this.setState({search: ''});
      })
      .catch(err => console.log);

    // Blur input for mobile users
    this.searchInput.blur();
  }

  handleSearchChange(event) {
    const search = event.target.value
    this.setState({search});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="search"
          className="form-control"
          placeholder="Chicago, IL"
          onChange={this.handleSearchChange}
          ref={(ref) => this.searchInput = ref}
          value={this.state.search}
        />
        <button type="submit" className="btn btn-default">Search</button>
      </form>
    );
  }
}

export default connect()(SearchBar);
