import { IGraph } from 'graphinius/lib/core/Graph';

/**
 * @todo figure out why this works when `export interface Window` does not
 * @todo figure out why this works although the file does not get imported anywhere
 */
declare global {
  interface Window {
    indexedDB             : any;
    mozIndexedDB          : any;
    webkitIndexedDB       : any;
    msIndexedDB           : any;

    IDBTransaction        : any;
    webkitIDBTransaction  : any;
    msIDBTransaction      : any;

    IDBKeyRange           : any;
    webkitIDBKeyRange     : any;
    msIDBKeyRange         : any;

    $G                    : any;
    graph                 : IGraph;

    process               : any;
  }
}

