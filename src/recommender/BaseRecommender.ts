import {TypedEdge, ITypedEdge} from 'graphinius/lib/core/typed/TypedEdge';
import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import * as $I from 'graphinius/lib/similarities/interfaces';
import {simFuncs as setSims} from 'graphinius/lib/similarities/SetSimilarities';
import {simFuncs as scoreSims} from 'graphinius/lib/similarities/ScoreSimilarities';
import {knnNodeArray} from 'graphinius/lib/similarities/SimilarityCommons';
import {TheExpanse} from './TheExpanse';



class BaseRecommender {
	private _expanse;
	private _augment;

	constructor(private _g: TypedGraph) {
		this._expanse = new TheExpanse(this._g);
	}


	/**
	 * Peform several steps of g.getNeighbors() or g.expandK() depending on criteria
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

