import {TypedEdge, ITypedEdge} from 'graphinius/lib/core/typed/TypedEdge';
import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {TheExpanse} from './TheExpanse';
import {simFuncs, knnNodeArray} from './SetSimilarity';


interface SubSetConfig {
  ntype: string; // node type to search for potential sub/super relationships
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
  addSubsetRelationship(cfg: SubSetConfig) : Set<ITypedEdge> {
    const edgeSet = new Set<ITypedEdge>();
    let edge: ITypedEdge;
    const allSets = {};
		this._g.getNodesT(cfg.ntype).forEach(n => {
			allSets[n.label] = this._expanse.expand(n, 'in', 'HAS_GENRE');
    });
    const ores = knnNodeArray(simFuncs.overlap, allSets, {knn: cfg.knn || 1, cutoff: cfg.cutoff || 0});
    // console.log(ores);
    ores.forEach(e => {
      if ( allSets[e.from].size < allSets[e.to].size ) {
        edge = this._g.addEdgeByID('ontheedge', this._g.n(e.from), this._g.n(e.to), {directed: true, type: cfg.rtype});
      }
      else {
        edge = this._g.addEdgeByID('ontheedge', this._g.n(e.to), this._g.n(e.from), {directed: true, type: cfg.rtype});
      }
      edgeSet.add(edge);
    });
    return edgeSet;
  }
}

export {
  TheAugments
}