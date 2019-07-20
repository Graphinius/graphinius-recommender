import { IGraph } from 'graphinius/lib/core/Graph';
import Dexie from 'dexie';
declare class MainGraphDB extends Dexie {
    graphs: Dexie.Table<IGraphStore, string>;
    constructor();
}
interface IGraphStore {
    _name: string;
    _graph: IGraph;
}
declare class GraphStore implements IGraphStore {
    _name: string;
    _graph: IGraph;
    constructor(name: string, graph?: IGraph);
    graph: IGraph;
    load(): Promise<Dexie.Collection<IGraphStore, string>>;
    save(): Promise<string>;
}
declare const db: MainGraphDB;
export { GraphStore, db };
