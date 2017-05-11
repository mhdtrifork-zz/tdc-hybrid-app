import React from 'react';

import './subComponent.css'

const Separator = React.createClass({

  displayName: 'Separator',
  
  render() {
    if (this.props.margin !== undefined) {
      if (this.props.margin) {
        return (
          <div>
            <div className="separator with-padding"/>
          </div>
        );
      }
    }
    return (
      <div>
        <div className="separator"/>
      </div>
    );
  },
});

module.exports = Separator;
