import {TypedEdge, ITypedEdge} from 'graphinius/lib/core/typed/TypedEdge';
import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {TheExpanse} from './TheExpanse';
import * as $I from '../similarity/interfaces';
import {simFuncs} from '../similarity/SetSimilarity';
import {knnNodeArray} from '../similarity/SimilarityCommons';



class BaseRecommender {
	private _expanse;

	constructor(private _g: TypedGraph) {

	}


	
}


export {
	BaseRecommender
}