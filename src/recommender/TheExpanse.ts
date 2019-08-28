import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';


class TheExpanse {

	constructor(private _g: TypedGraph) {}

	/**
	 * @todo should we copy all incoming Sets into a new one or
	 * 			 extend the base with the entries of the latter?
	 *			 The second case would be considerably faster when
	 *			 doing this iteratively during graph travsersl / expansion.
	 *			 -> Make it so!
	 *
	 * @param n node from which to expand
	 * @param d direction
	 * @param r relationship type to follow (only one at a time..)
	 * @param t target node type to filter (only one at a time..)
	 */
	expandK(n: ITypedNode, d:string, r :string, t? :string) {

	}


 /**
	* @description expansion from source to targets, ONE step
	*
	* @param n node from which to expand
	* @param d direction
	* @param r relationship type to follow (only one at a time..)
	* @param t target node type to filter (only one at a time..)
	*/
 	expand(n: ITypedNode, d:string, r :string, t? :string) {
	 switch(d) {
		 case 'in':
			 return this._g.ins(n, r);
		 case 'out':
			 return this._g.outs(n, r);
		 case 'conn':
			 return this._g.conns(n, r);
		 default:
			 throw new Error('unsupported edge direction');
	 }
 }


 /**
	* @description expansion from source to targets, ONE step
	*
	* @param set node set from which to expand
	* @param d direction
	* @param r relationship type to follow (only one at a time..)
	* @param t target node type to filter (only one at a time..)
	*/
	expandSet(set: Set<ITypedNode>, d:string, r :string, t? :string) : Set<ITypedNode> {
		const theExpanse = new Set<ITypedNode>();
		for ( let node of set ) {
			const nodeExp = this.expand(node, d, r, t);
			nodeExp.forEach(v => theExpanse.add(v));			
		}
		return theExpanse;
	}
}

export {
	TheExpanse
}