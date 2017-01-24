import React from 'react';
import { connect } from 'react-redux';

import { getForecast } from '../api/forecast';
import { forecastRetrievalCompleted } from 'forecastActions';
import { changeLocation, setAlert } from 'appActions';
import { selectConditions } from 'selectConditionsActions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      search: ''
    };
  }

  /**
   * Get city and state from city, state string. City and state/country will be
   * properly capitalized.
   *
   * @param {String} input - City, State string
   * @return {Object} city, state
   */
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

    (async () => {
      try {
        const {city, state} = this.transformLocation(this.state.search);
        const forecast = await getForecast(city, state);

        this.props.dispatch(changeLocation(city+', '+state));
        this.props.dispatch(selectConditions(forecast[0]));
        this.props.dispatch(forecastRetrievalCompleted(forecast));
        this.setState({search: ''});

        // Blur input for mobile users
        this.searchInputRef.blur();
      } catch(err) {
        console.log(err);
        this.props.dispatch(setAlert({
          type: 'danger',
          message: `Could not retrieve forecast data. Did you enter the city, 
          state/country correctly?`
        }));
      }
    })();
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
          placeholder="Chicago, IL | Paris, France"
          onChange={this.handleSearchChange}
          style={{minWidth: 300}}
          ref={(ref) => this.searchInputRef = ref}
          value={this.state.search}
        />
        <button type="submit" className="btn btn-default">Search</button>
      </form>
    );
  }
}

export default connect()(SearchBar);
