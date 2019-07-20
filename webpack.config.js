const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')


console.log('NODE_ENV: ', process.env.NODE_ENV);
// console.log('Production: ', process.env.PRODUCTION);

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';


module.exports = env => {
  return [{
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
      path: 'empty',
      Buffer: false
    },
    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/'
      })
    ]
  }]
};
