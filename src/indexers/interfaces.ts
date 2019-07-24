export interface IndexEntryBody {
  string  : string; 
  id      : string; 
  fields  : string[];
}

export type IndexConfig = {[k: string]: IndexEntryBody}
