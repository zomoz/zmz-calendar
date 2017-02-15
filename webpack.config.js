const path = require('path');
const webpack = require('webpack');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

console.log(path.join(__dirname, 'src', 'index.ts'));

module.exports = {
  entry: {
    'zmz-calendar': path.join(__dirname, 'src', 'index.ts')
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.html']
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: "[name].umd.js",
    library: ["[name]"],
    libraryTarget: "umd"
  },
  externals: [
    /^rxjs\//,    //.... any other way? rx.umd.min.js does work?
    /^@angular\//
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.woff$|\.ttf$|\.svg$|\.eot$/, loaders: ['url-loader?limit=10000']},
      { test: /\.html$/, loaders: ['raw-loader'] },
      { test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, loaders: ['raw-loader'] },
      { // Support for .ts files.
        test: /\.ts$/,
        loaders: ['@ngtools/webpack', 'angular2-template-loader']
      }
    ]
  },
  plugins: [
    new AotPlugin({
      tsConfigPath: path.resolve(__dirname, 'tsconfig.json'),
      entryModule: path.resolve(__dirname, 'src', 'calendar.module') + '#CalendarModule'
    })
  ]
};