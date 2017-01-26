import React from 'react';

import Alert from 'Alert';
import CurrentLocation from 'CurrentLocation';
import Footer from 'Footer';
import Nav from 'Nav';
import SelectedConditions from 'SelectedConditions';
import UnitTypeToggle from 'UnitTypeToggle';

export default function Main(props) {
  return (
    <div>
      <Nav />
      <main className="content">
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
      </main>
      <Footer />
    </div>
  );
}
