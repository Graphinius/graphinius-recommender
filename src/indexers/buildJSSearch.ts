import * as JSSearch from 'js-search';
import { IGraph, BaseGraph } from 'graphinius/lib/core/base/BaseGraph';
import { TypedNode } from 'graphinius/lib/core/typed/TypedNode';
import { IndexConfig } from './interfaces';

type Types = {[key: string]: any[]};
type Indexes = {[key: string]: any};

/**
 * Why does the import statement above work differently in TS / Bundled...
 */
const JsSearch = JSSearch.default || JSSearch;


function buildIdxJSSearch(graph: IGraph, idxConfig: IndexConfig) : {} {
  const types: Types = {};
  Object.keys(idxConfig).forEach(k => types[k] = []);
  const indexes: Indexes = {};
  Object.keys(idxConfig).forEach(k => indexes[k] = null);

  Object.values(graph.getNodes()).forEach( n => {
    if ( BaseGraph.isTyped(n) === false ) {
      throw Error(`Node Type not supported in this scenario...!`)
    }
    const type = (n as TypedNode).type;

    const idxObj = idxConfig[type];
    if ( !idxObj ) {
      console.log();
      return false;
    }
    let idxEntry = {id: n.getID()};
    idxObj.fields.forEach(f => idxEntry[f] = n.getFeature(f));

    // console.log(idxEntry);

    types[type].push(idxEntry);
  });
  // Object.keys(types).forEach(k => console.log(`${types[k].length} nodes of type ${k} registered.`));

  Object.values(idxConfig).forEach(model => {
    indexes[model.string] = new JsSearch.Search(model.id);
    model.fields.forEach(f => indexes[model.string].addIndex(f));
    indexes[model.string].addDocuments(types[model.string]);
  });


  /**
   * In `jsdom` environment, we can use the first variant...
   */
  window['idx'] = indexes;
  // if ( typeof window != null ) {
  //   (<any>window)['idx'] = indexes;
  // }
  // console.log(indexes);
  
  return indexes;
}


export {
  buildIdxJSSearch
}
