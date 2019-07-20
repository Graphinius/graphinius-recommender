import typescript from 'rollup-plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const isProduction = !!(process.env.MODE === "production")

/**
 * @todo production mode...
 */

export default {
  input: './src/index.ts',
  output: {
    file: 'public/js/bundle.js',
    sourcemap: isProduction,
    format: 'umd' // "amd", "cjs", "system", "esm", "iife" or "umd"
  },
  plugins: [
    typescript({
      target: "es5",
      lib: ["es5", "es6", "dom"]}
    ),
    resolve({
      process: true
    }),
    commonjs(),
    serve({
      contentBase: 'public',
      open: false,
      host: 'localhost',
      port: '8080'
    }),
    livereload({
      watch: 'public/js/bundle.js'
    })
  ]
}

