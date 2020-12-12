import {ITypedNode, TypedGraph, setSimFuncs, scoreSimFuncs } from 'graphinius';
import {TheExpanse} from "./TheExpanse";


export type EntryPoint = string | ITypedNode | Set<ITypedNode>;


class BaseRecommender {
	private _expanse;

	constructor(private _g: TypedGraph) {
		this._expanse = new TheExpanse(this._g);
	}


	// recommend


	/**
	 * We can have 1..n separate entry points
	 *
	 * @param arg argument representing
	 */
	entry(arg: EntryPoint) {

	}


	/**
	 * Peform several steps of g.getNeighbors() or g.expandK() depending on criteria
	 * @todo -) takes start node or set
	 * 			 -) takes a series of expansion steps, for each:
	 * 			 		- direction
	 * 			 	  - target type
	 * 			 	  - #steps
	 * 			 	  	- expand or periphery
	 * 			 -) callbacks to apply to each step ???
	 * 			 		- PRO: flexibility
	 * 			 	  - CONS: speed
	 */
	expandChain() {

	}


	/**
	 * Eliminate items from set which violate constraints
	 */
	applyConstraints() {

	}

}


export {
	BaseRecommender
}

