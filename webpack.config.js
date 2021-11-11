import { join } from 'path';
import { basePath } from './server/support/constants.js';

export default {
  mode: 'development',
  entry: './frontend/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    path: join(basePath, 'assets/dist'),
    filename: 'bundle.js',
  },
};
