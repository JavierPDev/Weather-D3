import React from 'react';
import { connect } from 'react-redux';

function CurrentLocation(props) {
  const {location} = props.app;

  if (!location) return null;

  return <h2>{location.replace('_', ' ')}</h2>;
}

export default connect(state => {
  return {
    app: state.app
  };
})(CurrentLocation);
