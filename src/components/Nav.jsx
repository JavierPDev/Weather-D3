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
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/forecast">Forecast</Link>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
