import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {DIR} from 'graphinius/lib/core/interfaces';


class TheExpanse {

  constructor(private _g: TypedGraph) {}


  /**
   * @param nodes either a node type as string or a Set of ITypedNodes
   * @param dir
   * @param rel
   * @returns expansion from a type of nodes or from a set of nodes
   *
   * @todo transfer to graphinius (core)?
   * @todo isn't the `set of nodes` version the same as our normal expander? Except we have a map here...?
   *       -> where is multiple dispatch when you need it !?
   *
   */
  accumulateSets(nodes: string | Map<string, ITypedNode>, dir: DIR, rel: string): {[key: string]: Set<ITypedNode>} {
    const result: {[key: string]: Set<ITypedNode>} = {};
    let sourceNodes = typeof nodes === 'string' ? this._g.getNodesT(nodes) : nodes;
    sourceNodes.forEach(n => {
      let targets = this._g.expand(n, dir, rel);
      if ( targets.size ) {
        result[n.label] = targets;
      }
    });
    return result;
  }
  

  /**
   * @description we get a map/dict of Set<ITypedNode>, a direction & a relation 
   * @returns a set of Set<ITypedNode>, where each Set is an expansion of one input Set
   * 
   * @todo transfer to graphinius (core)?
   * @todo rename -> !? ...
   */
  accumulateSetRelations(sources: {[key: string]: Set<ITypedNode>}, dir: DIR, rel: string) : {[key: string]: Set<ITypedNode>} {
    const result: {[key: string]: Set<ITypedNode>} = {};
    const keys = Object.keys(sources);
    for ( let i of keys ) {
      for ( let source of sources[i] ) {
        if ( !result[i] ) {
          result[i] = new Set<ITypedNode>();
        }
        let targets = this._g[dir](source, rel);
        for ( let skill of targets ) {
          result[i].add(skill);
        }
      }
    }
    return result;
  }

}


export {
	TheExpanse
}
