import typescript from 'rollup-plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';


const isProduction = process.env.NODE_ENV === "production";


export default {
  input: './src/index.ts',
  output: {
    file: 'public/js/bundle.js',
    sourcemap: !isProduction,
    format: 'umd' // "amd", "cjs", "system", "esm", "iife" or "umd"
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      process: true
    }),
    commonjs({
      // include: 'node_modules/lunr'
    }),
    typescript({
      target: "es5",
      lib: ["es6", "dom"]}
    ),
    serve({
      contentBase: 'public',
      open: false,
      host: '0.0.0.0',
      port: '8080'
    }),
    livereload({
      watch: 'public/js/bundle.js'
    }),
    isProduction && terser()
  ]
}
