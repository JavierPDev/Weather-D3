import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleNav() {
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    nav: state.nav
  };
})(Nav);
