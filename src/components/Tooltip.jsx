import React from 'react';
import { connect } from 'react-redux';

import { hideTooltip } from 'appActions';

class Tooltip extends React.Component {
  componentDidMount() {
    // Hide tooltip when clicking anywhere outside of target that caused
    // tooltip to appear. Useful for touch users who can only rely on click/
    // touch and not mouseover for displaying and hiding.
    document.body.addEventListener('click', (ev) => {
      if (ev.target === this.props.app.tooltip.originTarget) {
        this.props.hideTooltip();
      }
    }, false)
  }

  render() {
    const {x, y, contentElement, title} = this.props.app.tooltip;

    if (!x || !y || !contentElement || !title) return null;

    return (
      <div
        className="tool-tip"
        style={{
          left: x,
          top: y
        }}
      >
        <div className="panel panel-default tool-tip__panel">
          <div className="panel-heading">
            <div className="panel-title">
              {title}
            </div>
          </div>
          <div className="panel-body">
            {contentElement}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    app: state.app
  };
}, { hideTooltip })(Tooltip);
