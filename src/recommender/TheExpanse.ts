import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {DIR, ExpansionInput, ExpansionResult} from 'graphinius/lib/core/interfaces';
import {EDGE_TYPES} from "../../test/datasets/jobs/common";


export interface TopKConfig {
	k		: number;
	top	: boolean;
}


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
   * @returns a object of key : Set<ITypedNode>, where each ex.set is an expansion of one input Set
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


  /**
   * @todo figure out how often we'll need that & test it !!!
   *
   * @param sources
   * @param dir
   * @param rel
   */
	accumulateSetsFromSetsFreq(sources: {[key: string]: ExpansionInput}, dir: DIR, rel: string) : {[key: string]: ExpansionResult} {
		const result: {[key: string]: ExpansionResult} = {};
		const keys = Object.keys(sources);

		for ( let i of keys ) {
			if ( !result[i] ) {
				result[i] = {set: new Set<ITypedNode>(), freq: new Map<ITypedNode, number>()};
			}
			let res = result[i];
			// convert each ExpansionInput into a properly formatted object
			const input_i = TypedGraph.convertToExpansionResult(sources[i]);

			// iterate over the set only? => Why not, it's delivering ITypedNodes
			// which simultaneously are the keys in the freq Map
			for ( let source of input_i.set ) {
				let targets = this._g.expand(source, dir, rel);
				if ( !targets.set.size ) {
					continue;
				}
				for ( let nodeRef of targets.set ) {
					if ( !res.freq.has(nodeRef) ) {
						res.freq.set(nodeRef, targets.freq.get(nodeRef));
					}
					if ( res.set.has(nodeRef) ) {
						res.freq.set(nodeRef, res.freq.get(nodeRef) + targets.freq.get(nodeRef));
					}
					res.set.add(nodeRef);
				}
			}
		}
		return result;
	}


	/**
	 *
	 * @param obj
	 * @param cfg
	 */
	setFromSetsTopK(obj: {[key: string]: ExpansionResult}, cfg: TopKConfig = {k: 5, top: true}) : {[key: string]: ExpansionResult} {
		const sortFunc = cfg.top ? (a, b) => b[1] - a[1] : (a, b) => a[1] - b[1];
		const result: {[key: string]: ExpansionResult} = {};
		for ( let [id, e] of Object.entries(obj) ) {
			result[id] = {set: new Set<ITypedNode>(), freq: new Map<ITypedNode, number>()};
			result[id].freq = new Map([...e.freq.entries()].sort(sortFunc).slice(0, cfg.k));
			result[id].set = new Set([...result[id].freq.keys()]);
		}
		return result;
	}


	/**
	 * @description get a readable version of a SetFromSetsFreq object
	 *
	 * @param obj
	 * @param idName
	 * @param collectionName
	 * @param itemName
	 *
	 * @returns object with source name & a list of plain item names with item frequencies
	 *
	 * @todo specify return value
	 */
  readableSetsFromSetsFreq(obj: {[key: string]: ExpansionResult}, idName: string, collectionName: string, itemName: string) {
  	return Object.entries(obj).map(e => ({
      [idName]: this._g.n(e[0]).f('name'),
      [collectionName]: Array.from(e[1].freq).map(v => ({freq: v[1], [itemName]: v[0].f('name')}))
    }));
  }


}


export {
	TheExpanse
}
