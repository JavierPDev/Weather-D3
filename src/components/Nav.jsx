import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

import SearchBar from 'SearchBar';

export default function Nav() {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <SearchBar />
              </div>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/forecast" activeClassName="active-nav-link">
                  Forecast
                </Link>
              </li>
              <li>
                <Link to="/windspeed" activeClassName="active-nav-link">
                  Windspeed
                </Link>
              </li>
              <li>
                <Link to="/humidity" activeClassName="active-nav-link">
                  Humidity
                </Link>
              </li>
              <li>
                <Link to="/averages" activeClassName="active-nav-link">
                  5-Day Averages
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
