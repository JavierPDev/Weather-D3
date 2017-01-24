import React from 'react';

import Nav from 'Nav';
import Alert from 'Alert';
import UnitTypeToggle from 'UnitTypeToggle';
import CurrentLocation from 'CurrentLocation';
import SelectedConditions from 'SelectedConditions';

export default function Main(props) {
  return (
    <div>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <Alert />
            <UnitTypeToggle />
            <CurrentLocation />
            <SelectedConditions />
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
