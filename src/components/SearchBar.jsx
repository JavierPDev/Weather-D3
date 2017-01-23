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

  handleSubmit(e) {
    e.preventDefault();

    const input = this.state.search.split(', ');
    const city = input[0].replace(' ', '_');
    const state = input[1];

    getForecast(city, state)
      .then(forecast => {
        this.props.dispatch(changeLocation(city+', '+state));
        this.props.dispatch(selectConditions(forecast[0]));
        this.props.dispatch(forecastRetrievalCompleted(forecast));
        this.setState({search: ''});
      })
      .catch(err => console.log);
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
          value={this.state.search}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default connect()(SearchBar);
