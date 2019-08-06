import { IGraph } from 'graphinius/lib/core/base/BaseGraph';
import { TypedGraph } from 'graphinius/lib/core/typed/TypedGraph';
import { JSONInput, JSONGraph, JSONNode } from 'graphinius/lib/io/input/JSONInput';
import { IndexConfig, AppConfig } from '../indexers/interfaces';


const jsonIn = new JSONInput({directed: true, explicit_direction: false, weighted: false});


async function importGraph(config: AppConfig) {
  console.log(`Loading ${config.graphName}...`);
  let tic = +new Date;
  const graph: IGraph = await importGraphFromURL(config);
  let toc = +new Date;
  console.log(`Importing graph of |V|=${graph.nrNodes()} and |E_dir|=${graph.nrDirEdges()} took ${toc-tic} ms.`);
  console.log(graph.stats);
  return graph;
}


async function importGraphFromURL(config: AppConfig) {
  const graphBytes = await(await fetch(config.graphFile));
  const graphString = await graphBytes.json();
  let graph: IGraph = new TypedGraph(config.graphName);
  graph = jsonIn.readFromJSON(graphString, graph);
  window.graph = graph;
  return graph;
}


export {
  importGraph
}
