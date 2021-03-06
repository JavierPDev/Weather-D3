import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config from './webpack.config.babel';
import { WUNDERGROUND_API_KEY } from './environment.json';

config.output = {
  path: './dist/',
  filename: 'bundle.js'
};

// Minify css
config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?minimize!autoprefixer-loader'
  )
});
config.module.loaders.push({
  test: /\.scss$/,
  exclude: /node_modules/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?minimize!autoprefixer-loader!sass-loader'
  )
});

// Strip debug code from js in addition to usual DI and, babel, and linting
config.module.loaders.push({
  test: /(\.js$)|(\.jsx$)/,
  loader: 'strip-loader?strip[]=debug,strip[]=console.log!babel-loader'
});

// Minify js without mangling globals
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  mangle: {
    except: ['$super', '$', 'exports', 'require']
  }
}));

// Set environment variables for opeanweathermap api key and for production
// build of react.
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'WUNDERGROUND_API_KEY': JSON.stringify(
      process.env.WUNDERGROUND_API_KEY || WUNDERGROUND_API_KEY
    ),
    'NODE_ENV': JSON.stringify('production')
  }
}));

export default config;
