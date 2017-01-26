import React from 'react';
import { connect } from 'react-redux';

import { hideAlert } from 'appActions';

class Alert extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.app.alert.type) {
      setTimeout(() => {
        this.props.hideAlert();
      }, 3000);
    }
  }

  render() {
    const {type, message} = this.props.app.alert;

    if (!type || !message) return null;

    return (
      <div className={'alert alert-dismissable alert-' + type}>
        <button className="close" onClick={this.props.hideAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
        {message}
      </div>
    );
  }
}

export default connect(state => {
  return {
    app: state.app
  };
}, { hideAlert })(Alert);
