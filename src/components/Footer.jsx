import React from 'react';

export default function Footer(props) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            Powered by &nbsp;
            <a href="https://www.wunderground.com/weather/api/" target="_blank">
              the Weather Underground API
            </a>
          </div>
          <div className="col-sm-6">
            Source code on &nbsp;
            <a href="https://github.com/JavierPDev/weather-d3" target="_blank">
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
