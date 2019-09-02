import {TypedEdge, ITypedEdge} from 'graphinius/lib/core/typed/TypedEdge';
import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {TheExpanse} from './TheExpanse';
import * as $I from '../similarity/interfaces';
import {simFuncs} from '../similarity/SetSimilarity';
import {knnNodeArray} from '../similarity/SimilarityCommons';

interface SubSetConfig extends $I.SortCutFuncs {
  rtype: string; // name of edge TYPE to use
  knn?: number;
  cutoff?: number;
}


class TheAugments {
  private _expanse;

  constructor(private _g: TypedGraph) {
    this._expanse = new TheExpanse(this._g);
  }
  

  /**
   * @todo implement
   */
  addSubsetRelationship(algo: Function, sets: $I.SetOfSets, cfg: SubSetConfig) : Set<ITypedEdge> {
    const edgeSet = new Set<ITypedEdge>();
    let edge: ITypedEdge;
    const g = this._g;
    
    const ores = knnNodeArray(algo, sets, {knn: cfg.knn || 1, cutoff: cfg.cutoff || 0});
    // console.log(ores);
    ores.forEach(e => {
      if ( sets[e.from].size < sets[e.to].size ) {
        edge = g.addEdgeByID('ontheedge', g.n(e.from), g.n(e.to), {directed: true, type: cfg.rtype});
      }
      else {
        edge = g.addEdgeByID('ontheedge', g.n(e.to), g.n(e.from), {directed: true, type: cfg.rtype});
      }
      edgeSet.add(edge);
    });
    return edgeSet;
  }
}

export {
  TheAugments
}
