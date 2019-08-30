import * as $I from './interfaces';
import { blockStatement } from '@babel/types';

const PRECISION = 5;

export const simFuncs = {
  cosine,
  cosineSets
}



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
	return cosine(aa, ba);
}


function extractCommonTargetScores(a: Set<string>, b: Set<string>): [number[], number[]] {
  // we need to extract common targets first
  let a_id = new Set(), b_id = new Set();
  for ( let e of a ) a_id.add(e.split('#')[0]);
  for ( let e of b ) b_id.add(e.split('#')[0]);
  // now we collect the scores for common targets
  let aa = [], ba = [];
  for ( let e of a )  {
    const earr = e.split('#');
    if ( b_id.has(earr[0]) ) {
      aa.push(+earr[earr.length-1]);
    }
  }
  for ( let e of b )  {
    const earr = e.split('#');
    if ( a_id.has(earr[0]) ) {
      ba.push(+earr[earr.length-1]);
    }
  }
  return [aa, ba];
}


