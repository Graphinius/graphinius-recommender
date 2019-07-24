import { IGraph } from 'graphinius/lib/core/Graph';
import { JSONInput, JSONGraph, JSONNode } from 'graphinius/lib/io/input/JSONInput';
import { IndexConfig, AppConfig } from '../../src/indexers/interfaces';

const jsonIn = new JSONInput({directed: true, explicit_direction: false, weighted: false});


async function importGraph(config: AppConfig) {
  console.log(`Loading ${config.graphName}...`);
  let tic = +new Date;
  const graph: IGraph = await getOrCreateGraph(config.graphFile);
  let toc = +new Date;
  console.log(`Importing graph of |V|=${graph.nrNodes()} and |E_dir|=${graph.nrDirEdges()} took ${toc-tic} ms.`);
  return graph;
}


async function getOrCreateGraph(graphFile: string) {
  let graph = await importGraphFromURL(graphFile);
  /* HACKETY HACK */
  window.graph = graph;

  return graph;
}


async function importGraphFromURL(graphFile) {
  const graphBytes = await(await fetch(graphFile));
  const graphString = await graphBytes.json();
  const graph = jsonIn.readFromJSON(graphString);  
  return graph;
}


export {
  importGraph
}
