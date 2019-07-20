import { IGraph } from 'graphinius/lib/core/Graph';
import Dexie from 'dexie';
import { classBody } from '@babel/types';

class MainGraphDB extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  graphs: Dexie.Table<IGraphStore, string>; // string = type of the primkey

  constructor () {
      super("MainGraphDB");
      this.version(1).stores({
          graphs: '++id, name',
          //...other tables goes here...
      });
      // The following line is needed if your typescript
      // is compiled using babel instead of tsc:
      this.graphs = this.table("graphs");
  }
}


interface IGraphStore {
  _name    : string,
  _graph   : IGraph
}


class GraphStore implements IGraphStore {
  _name  : string;
  _graph : IGraph;

  constructor(name: string, graph?: IGraph) {
    this._name = name;
    if ( graph ) {
      this._graph = graph;
    }
  }

  get graph() {
    return this._graph;
  }

  set graph(graph: IGraph) {
    this._graph = graph;
  }

  async load() {
    return await db.graphs.where('name').equals(this._name);
  }

  async save() {
    return await db.graphs.put(this, this._name)
  }

}


const db = new MainGraphDB();
db.graphs.mapToClass(GraphStore);


export {
  GraphStore,
  db
}


// // In the following line, you should include the prefixes of implementations you want to test.
// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// // DON'T use "var indexedDB = ..." if you're not in a function.
// // Moreover, you may need references to some window.IDB* objects:
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

// if (!window.indexedDB) {
//   console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
// }
