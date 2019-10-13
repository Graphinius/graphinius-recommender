import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {DIR} from 'graphinius/lib/core/interfaces';
import {EDGE_TYPES} from "../../test/datasets/jobs/common";


class TheExpanse {

  constructor(private _g: TypedGraph) {}


  accumulateNodesFromIDs(ids: string[]) : Map<string, ITypedNode> {
    let result = new Map<string, ITypedNode>();
    ids.forEach(id => result.set(id, this._g.n(id)));
    return result;
  }


  accumulateNodesFromNodes(nodes: string[] | Set<ITypedNode> | Map<string, ITypedNode>,
                           dir: DIR, rel: EDGE_TYPES) : Map<string, ITypedNode> {
    let result = new Map<string, ITypedNode>();
    nodes.forEach(node => {
      let targets;
      if ( typeof node === 'string' ) {
        targets = this._g[dir](this._g.n(node), rel);
      } else {
        targets = this._g[dir](node, rel);
      }
      if ( targets ) {
        targets.forEach(t => result.set(t.id, t));
      }
    });
    return result;
  }


  /**
   * @param nodes either a node type as string or a Map of ITypedNodes
   * @param dir
   * @param rel
   * @returns expansion from a type of nodes or from a set of nodes
   *
   * @todo transfer to graphinius (core)?
   * @todo isn't the `set of nodes` version the same as our normal expander? Except we have a map here...?
   *       -> where is multiple dispatch when you need it !?
   */
  accumulateSetsFromNodes(nodes: string | Map<string, ITypedNode>, dir: DIR, rel: string): {[key: string]: Set<ITypedNode>} {
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
   * @returns a object of key : Set<ITypedNode>, where each Set is an expansion of one input Set
   * 
   * @todo transfer to graphinius (core)?
   * @todo rename -> !? ...
   */
  accumulateSetsFromSets(sources: {[key: string]: Set<ITypedNode>}, dir: DIR, rel: string) : {[key: string]: Set<ITypedNode>} {
    const result: {[key: string]: Set<ITypedNode>} = {};
    const keys = Object.keys(sources);
    for ( let i of keys ) {
      for ( let source of sources[i] ) {
        if ( !result[i] ) {
          result[i] = new Set<ITypedNode>();
        }
        let targets = this._g[dir](source, rel);
        if ( !targets ) {
          continue;
        }
        for ( let target of targets ) {
          result[i].add(target);
        }
      }
    }
    return result;
  }

}


export {
	TheExpanse
}
