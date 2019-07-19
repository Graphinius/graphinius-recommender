const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')


const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
// const isProduction = true;
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';

module.exports = [
  {
    entry: './src/index.ts',
    target: 'web',
    mode,
    devtool,
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            compilerOptions: {
              "sourceMap": !isProduction,
            }
          }
        }
      ]
    },
    resolve: {
      extensions: [ '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public', 'js')
    },
    node: {
      __dirname: false,
      __filename: false,
      fs: 'empty',
      path: 'empty'
    },
    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/'
      })
    ]
  } 
];
