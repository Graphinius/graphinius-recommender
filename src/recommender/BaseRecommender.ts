import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';


class BaseRecommender {

	constructor() {}


	/**
	 *
	 * @param {n}
	 * @param t
	 * @param s
	 */
	expandOutward(n: TypedNode, t: string, s: number) {

	}


 /**
	* @description expansion from source to targets, ONE step
	*
	* @param g graph
	* @param n node from which to expand
	* @param d direction
	* @param r relationship type to follow (only one at a time..)
	* @param t target node type to filter (only one at a time..)
	*/
 	static expand(g: TypedGraph, n: ITypedNode, d:string, r :string, t? :string) {
	 switch(d) {
		 case 'in':
			 return g.ins(n, r);
		 case 'out':
			 return g.outs(n, r);
		 case 'conn':
			 return g.conns(n, r);
		 default:
			 throw new Error('unsupported edge direction');
	 }
 }

}

export {
	BaseRecommender
}