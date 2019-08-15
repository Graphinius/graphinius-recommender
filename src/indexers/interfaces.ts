export interface IndexEntryBody {
  string  : string; 
  id      : string; 
  fields  : string[];
}


export type IndexConfig = {[k: string]: IndexEntryBody}


export interface AppConfig {
  graphName       : string;
  graphFile       : string;
  searchTerm      : string;
  idxConfig       : IndexConfig;
  models          : any;
  searchModel     : any;
}
