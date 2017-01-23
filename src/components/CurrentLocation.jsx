import React from 'react';
import { connect } from 'react-redux';

class CurrentLocation extends React.Component {
  renderLocation() {
    const {location} = this.props.app;

    if (!location) return null;

    return <h2>{location.replace('_', ' ')}</h2>;
  }

  render() {
    return this.renderLocation();
  }
}

export default connect(state => {
  return {
    app: state.app
  };
})(CurrentLocation);
