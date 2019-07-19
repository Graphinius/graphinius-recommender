import { IGraph } from 'graphinius/lib/core/Graph';
declare function importGraphFromFile(graphFile: any): IGraph;
declare function importGraphFromURL(graphFile: any): Promise<IGraph> | null;
export { importGraphFromFile, importGraphFromURL };
