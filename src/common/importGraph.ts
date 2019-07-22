import { IGraph } from 'graphinius/lib/core/Graph';
import { JSONInput, JSONGraph, JSONNode } from 'graphinius/lib/io/input/JSONInput';

const jsonIn = new JSONInput({directed: true, explicit_direction: false, weighted: false});


async function importGraphFromURL(graphFile) {
  const graphBytes = await(await fetch(graphFile));
  const graphString = await graphBytes.json();
  const graph = jsonIn.readFromJSON(graphString);  
  return graph;
}


export {
  importGraphFromURL
}
