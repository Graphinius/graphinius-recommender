import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {DIR, ExpansionResult} from 'graphinius/lib/core/interfaces';
import {EDGE_TYPES} from "../../test/datasets/jobs/common";


class TheExpanse {

  constructor(private _g: TypedGraph) {}

  /**
   * @description `expand` IDs to ITypedNodes -> 1:1 mapping
   * @param ids
   */
  accumulateNodesFromIDs(ids: string[]) : Map<string, ITypedNode> {
    let result = new Map<string, ITypedNode>();
    ids.forEach(id => result.set(id, this._g.n(id)));
    return result;
  }


  /**
   * @description expand & replace nodes with target nodes, for further expansion
   *
   * @example we want to
   *
   * @param nodes
   * @param dir
   * @param rel
   *
   * @todo incorporate frequencies ??
   *
   */
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
   * @description replace a node with a set of target nodes, but keep the original ID
   *
   * @example Map<companyID, Company> would be replaced with Map<companyID, Set<Employees>> through the 'WORKS_FOR' relation
   *          Map<personID, Person> would be replace with Map<personID, Set<Friends>> through the 'KNOWS' relation
   *
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
      let targets = this._g.expand(n, dir, rel).set;
      if ( targets.size ) {
        result[n.label] = targets;
      }
    });
    return result;
  }
  

  /**
   * @description we get a map/dict of Set<ITypedNode>, a direction & a relation
   *
   * @example Map<companyID, Set<Employees>> would be replaced with Map<companyID, Set<Countries>> through the 'LIVES_IN' relation
   *          Map<personID, Set<Friends>> would be replaced with Map<personID, Set<Skills>> through the 'HAS_SKILL' relation
   *
   * @returns a object of key : Set<ITypedNode>, where each Set is an expansion of one input Set
   *
   * @todo this should give back sets with frequencies, so ExpansionResult objects
   */
  accumulateSetsFromSets(sources: {[key: string]: Set<ITypedNode>}, dir: DIR, rel: string) : {[key: string]: Set<ITypedNode>} {
    const result: {[key: string]: Set<ITypedNode>} = {};
    const keys = Object.keys(sources);
    for ( let i of keys ) {
      for ( let source of sources[i] ) {
        if ( !result[i] ) {
          result[i] = new Set<ITypedNode>();
        }
        let targets = this._g.expand(source, dir, rel);
        if ( !targets ) {
          continue;
        }
        for ( let target of targets.set ) {
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
