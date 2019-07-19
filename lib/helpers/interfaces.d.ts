import { IGraph } from 'graphinius/lib/core/Graph';
declare global {
    interface Window {
        indexedDB: any;
        mozIndexedDB: any;
        webkitIndexedDB: any;
        msIndexedDB: any;
        IDBTransaction: any;
        webkitIDBTransaction: any;
        msIDBTransaction: any;
        IDBKeyRange: any;
        webkitIDBKeyRange: any;
        msIDBKeyRange: any;
        graph: IGraph;
    }
}
