import { IBaseNode } from 'graphinius/lib/core/Nodes';
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
    idxFuse               : any;

    process               : any;
  }
}


/**
 * @todo generalize
 */
export interface MeetupIndexesLunr {
  groupIdx: lunr.Index
  topicIdx: lunr.Index;
  memberIdx: lunr.Index;
  eventIdx: lunr.Index;
}


/**
 * @todo generalize
 */
export interface MeetupIndexesFuse {
  groupIdx: Fuse<IBaseNode, Fuse.FuseOptions<any>>;
  topicIdx: Fuse<IBaseNode, Fuse.FuseOptions<any>>;
  memberIdx: Fuse<IBaseNode, Fuse.FuseOptions<any>>;
  eventIdx: Fuse<IBaseNode, Fuse.FuseOptions<any>>;
}



