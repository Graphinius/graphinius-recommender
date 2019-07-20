import { IGraph } from 'graphinius/lib/core/Graph';
import { JSONInput, JSONGraph, JSONNode } from 'graphinius/lib/io/input/JSONInput';

const jsonIn = new JSONInput({directed: true, explicit_direction: false, weighted: false});


function importGraphFromFile(graphFile) : IGraph {
  let tic = +new Date;
  const graph = jsonIn.readFromJSONFile(graphFile);
  let toc = +new Date;

  console.log(graph.getStats());
  console.log(`Importing graph of |V|=${graph.nrNodes()} and |E_dir|=${graph.nrDirEdges()} took ${toc-tic} ms.`);
  
  return graph;
}


async function importGraphFromURL(graphFile) : Promise<IGraph> | null {
  let tic = +new Date;
  const graphBytes = await(await fetch(graphFile));
  // console.log(graphBytes);  
  const graphString = await graphBytes.json();
  const graph = jsonIn.readFromJSON(graphString);
  let toc = +new Date;

  console.log(graph.getStats());
  console.log(`Importing graph of |V|=${graph.nrNodes()} and |E_dir|=${graph.nrDirEdges()} took ${toc-tic} ms.`);
  
  return graph;
}


export {
  importGraphFromFile,
  importGraphFromURL
}

