import { IBaseNode } from 'graphinius/lib/core/Nodes';
import { IGraph, BaseGraph } from 'graphinius/lib/core/Graph';

declare const lunr;

const types = {
  Group: [] as IBaseNode[],
  Topic: [] as IBaseNode[],
  Member: [] as IBaseNode[],
  Event: [] as IBaseNode[]
};


/**
 * @todo generalize
 */
export interface Indexes {
  groupIdx: lunr.Index;
  topicIdx: lunr.Index;
  memberIdx: lunr.Index;
  eventIdx: lunr.Index;
}


function buildIndexes(graph: IGraph) : Indexes {
  const indexes: Indexes = {
    groupIdx: null, 
    topicIdx: null, 
    memberIdx: null, 
    eventIdx: null
  }

  Object.values(graph.getNodes()).forEach( n => {
    types[n.getLabel()].push(n);
  });
  Object.keys(types).forEach(k => console.log(`${types[k].length} nodes of type ${k} registered.`));

  indexes.groupIdx = lunr(function () {
    this.ref('id');
    this.field('name');
    this.field('description');
    this.field('organiserName');

    types.Group.forEach(n => this.add({
      id: n.getID(),
      name: n.getFeature('name'),
      description: n.getFeature('description'),
      organiserName: n.getFeature('organiserName')
    }));
  });

  indexes.topicIdx = lunr(function () {
    this.ref('id');
    this.field('name');
    this.field('urlkey');

    types.Topic.forEach(n => this.add({
      id: n.getID(),
      name: n.getFeature('name'),
      urlkey: n.getFeature('urlkey'),
    }));
  });

  indexes.memberIdx = lunr(function () {
    this.ref('id');
    this.field('name');

    types.Member.forEach(n => this.add({
      id: n.getID(),
      name: n.getFeature('name'),
    }));
  });

  indexes.eventIdx = lunr(function () {
    this.ref('id');
    this.field('name');
    this.field('description');

    types.Event.forEach(n => this.add({
      id: n.getID(),
      name: n.getFeature('name'),
      description: n.getFeature('description')
    }));
  });

  return indexes;
}

export {
  buildIndexes
}