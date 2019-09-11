import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {DIR} from 'graphinius/lib/core/interfaces';


class TheExpanse {

  constructor(private _g: TypedGraph) {}


  accumulateSets(ntype: string, dir: DIR, rel: string): {[key: string]: Set<ITypedNode>} {
    const result: {[key: string]: Set<ITypedNode>} = {};
    this._g.getNodesT(ntype).forEach(n => {
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
   * @todo rename -> accumulateSetOfSets !? ...
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
