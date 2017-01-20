import React from 'react';
import { connect } from 'react-redux';

import { getForecast } from '../api/forecast';
import { forecastRetrievalCompleted } from 'forecastActions';

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
    const city = input[0].split(' ').join('_');
    const state = input[1];

    getForecast(city, state)
      .then(forecast => {
        this.props.dispatch(forecastRetrievalCompleted(forecast));
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
          placeholder="Chicago, IL"
          onChange={this.handleSearchChange}
          value={this.state.search}
        />
      </form>
    );
  }
}

export default connect()(SearchBar);
