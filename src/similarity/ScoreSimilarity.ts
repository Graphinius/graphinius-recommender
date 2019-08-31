import * as $I from './interfaces';
import {IBaseNode} from 'graphinius/lib/core/base/BaseNode';

const PRECISION = 5;

export const simFuncs = {
  cosine,
  cosineSets,
	cosineEmbeddings
};


/*----------------------------------*/
/*			SET SIMILARITY MEASURES			*/
/*----------------------------------*/


/**
 * 
 * @param a 
 * @param b 
 */
 function cosine(a: number[], b: number[]) {
	if ( a.length !== b.length ) {
		throw new Error('Vectors must be of same size');
	}
	const fa1 = new Float32Array(a);
	const fa2 = new Float32Array(b);
	let numerator = 0;
	for ( let i = 0; i < fa1.length; i++ ) {
			numerator += fa1[i] * fa2[i];
	}
	let dena = 0, denb = 0;
	for ( let i = 0; i < fa1.length; i++ ) {
		dena += fa1[i] * fa1[i];
		denb += fa2[i] * fa2[i];
	}
	dena = Math.sqrt(dena);
	denb = Math.sqrt(denb);
	return {sim: +(numerator / (dena * denb)).toPrecision(PRECISION)};
}


/**
 * @description first extract
 * @param a 
 * @param b 
 */
function cosineSets(a: Set<string>, b: Set<string>) {
  const [aa, ba] = extractCommonTargetScores(a, b);
  if ( !aa.length || !ba.length ) {
    return {sim: 0};
  }
	return cosine(aa, ba);
}


/**
 * Takes nodes...
 */
function cosineEmbeddings(a: Set<IBaseNode>, b: Set<IBaseNode>) {
	console.log(a);
	let a_id = new Set(), b_id = new Set();
	for ( let e of a ) a_id.add(e.label);
	for ( let e of b ) b_id.add(e.label);

	let a_vec = [], b_vec = [];
	for ( let e of a ) {
		if ( b_id.has(e.label) ) {
			a_vec = a_vec.concat(e.getFeature('embeddings'));
		}
	}
	for ( let e of b ) {
		if ( a_id.has(e.label) ) {
			b_vec = b_vec.concat(e.getFeature('embeddings'));
		}
	}
	if ( !a_vec.length || !b_vec.length ) {
		return {sim: 0};
	}
	console.log(a_vec);
	return cosine(a_vec, b_vec);
}




/**
 * @description this method implicitly ensures that sets given to cosine
 * 							are always of the same length
 * @param a
 * @param b
 */
function extractCommonTargetScores(a: Set<string>, b: Set<string>): [number[], number[]] {
  // we need to extract common targets first
  let a_id = new Set(), b_id = new Set();
  for ( let e of a ) a_id.add(e.split('#')[0]);
  for ( let e of b ) b_id.add(e.split('#')[0]);
  // now we collect the scores for common targets
  let a_vec = [], b_vec = [];
  for ( let e of a )  {
    const earr = e.split('#');
    if ( b_id.has(earr[0]) ) {
      a_vec.push(+earr[earr.length-1]);
    }
  }
  for ( let e of b )  {
    const earr = e.split('#');
    if ( a_id.has(earr[0]) ) {
      b_vec.push(+earr[earr.length-1]);
    }
  }
  return [a_vec, b_vec];
}


