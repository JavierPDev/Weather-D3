import React from 'react';
import { connect } from 'react-redux';

import { setAlert } from 'appActions';

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.handleExitClick = this.handleExitClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.app.alert.type) {
      setTimeout(() => {
        this.props.dispatch(setAlert({type: null, message: null}));
      }, 3000);
    }
  }

  handleExitClick() {
    this.props.dispatch(setAlert({type: null, message: null}));
  }

  render() {
    const {type, message} = this.props.app.alert;

    if (!type || !message) return null;

    return (
      <div className={'alert alert-dismissable alert-' + type}>
        <button className="close" onClick={this.handleExitClick}>
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
})(Alert);
