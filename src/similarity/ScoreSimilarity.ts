import * as $I from './interfaces';
import {IBaseNode} from 'graphinius/lib/core/base/BaseNode';

const PRECISION = 5;

export const simFuncs = {
  cosine,
  cosineSets,
	euclidean,
	euclideanSets,
	pearson
};


/*----------------------------------*/
/*			SET SIMILARITY MEASURES			*/
/*----------------------------------*/


function euclidean(a: number[], b: number[]) {
	if ( a.length !== b.length ) {
		throw new Error('Vectors must be of same size');
	}
	const at = a.length < 1e4 ? a : new Float32Array(a);
	const bt = b.length < 1e4 ? b : new Float32Array(b);

	let sum = 0, diff = 0;
	for ( let i = 0; i < at.length; i++ ) {
		diff = at[i] - bt[i];
		sum += diff * diff;
	}
	let sim = +Math.sqrt(sum).toPrecision(PRECISION);
	// console.log(sim);
	return {sim};
}


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
 *
 * @param a
 * @param b
 */
function pearson(a: number[], b: number[]) {
	if ( a.length !== b.length ) {
		throw new Error('Vectors must be of same size');
	}
	let sum_a = 0, sum_b = 0, mean_a, mean_b, numerator = 0, diff_a_sq = 0, diff_b_sq = 0, denominator, a_diff, b_diff, sim;
	for ( let i = 0; i < a.length; i++ ) {
		sum_a += a[i];
		sum_b += b[i];
	}
	mean_a = sum_a / a.length;
	mean_b = sum_b / b.length;

	for ( let i = 0; i < a.length; i++ ) {
		a_diff = a[i] - mean_a;
		b_diff = b[i] - mean_b;
		numerator += a_diff * b_diff;
		diff_a_sq += a_diff * a_diff;
		diff_b_sq += b_diff * b_diff;
	}
	denominator = Math.sqrt(diff_a_sq) * Math.sqrt(diff_b_sq);
	sim = +(numerator / denominator).toPrecision(PRECISION);
	return {sim};
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


function euclideanSets(a: Set<string>, b: Set<string>) {
	const [aa, ba] = extractCommonTargetScores(a, b);
	if ( !aa.length || !ba.length ) {
		return {sim: 0};
	}
	return euclidean(aa, ba);
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
  let a_vec = [], b_vec = [], earr;
  for ( let e of a )  {
    earr = e.split('#'); // we can assume 0 is the target...
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


