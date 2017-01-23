import React from 'react';

import Nav from 'Nav';
import SearchBar from 'SearchBar';
import UnitTypeToggle from 'UnitTypeToggle';
import CurrentLocation from 'CurrentLocation';
import SelectedConditions from 'SelectedConditions';

export default function Main(props) {
  return (
    <div>
      <Nav />
      <SearchBar />
      <UnitTypeToggle />
      <CurrentLocation />
      <SelectedConditions />
      {props.children}
    </div>
  );
}
