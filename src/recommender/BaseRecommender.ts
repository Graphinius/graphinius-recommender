import {TypedEdge, ITypedEdge} from 'graphinius/lib/core/typed/TypedEdge';
import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {TheExpanse} from './TheExpanse';
import * as $I from '../similarity/interfaces';
import {simFuncs as setSims} from '../similarity/SetSimilarity';
import {simFuncs as scoreSims} from '../similarity/ScoreSimilarity';
import {knnNodeArray} from '../similarity/SimilarityCommons';
import {TheAugments} from "./TheAugments";



class BaseRecommender {
	private _expanse;
	private _augment;

	constructor(private _g: TypedGraph) {
		this._augment = new TheAugments(this._g);
		this._expanse = new TheExpanse(this._g);
	}


	/**
	 * @description takes a node type and computes pairwise similarities
	 * @param algo similarity function
	 * @param type
	 */
	embeddingsSimilarity(algo: Function, type: string) : $I.SimilarityResult {
		throw('Not implemented yet');
	}


	/**
	 * @description
	 * @param t1
	 * @param t2
	 */
	groupSimilarity(t1: string, t2: string) {}

	
}


export {
	BaseRecommender
}

