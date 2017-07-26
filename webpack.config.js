const webpack = require('webpack')
module.exports = {
  entry: './app.js',
  output: { path: __dirname, filename:'bundle.js' },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],


  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react','stage-0'],
          plugins: [
            'transform-decorators-legacy'
          ]
        }
      },
      {
        test:/\.css$/,
        loader: 'style-loader!css-loader',
        },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff" },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      }
    ]
  }
}
