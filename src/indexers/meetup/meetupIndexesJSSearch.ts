import { MeetupIndexesJSSearch } from '../../common/interfaces';
import { IBaseNode } from 'graphinius/lib/core/Nodes';
import { IGraph, BaseGraph } from 'graphinius/lib/core/Graph';
import * as JSSearch from 'js-search';

const JsSearch = JSSearch.default;
// console.log(JsSearch);
// window.jsSearch = JsSearch;


const types = {
  Groups: [],
  Topics: [],
  Members: [],
  Events: []
};


function buildIndexesJSSearch(graph: IGraph) : MeetupIndexesJSSearch {
  const indexes: MeetupIndexesJSSearch = {
    groupIdx: null,
    topicIdx: null,
    memberIdx: null,
    eventIdx: null
  };

  Object.values(graph.getNodes()).forEach( n => {
    switch(n.getLabel()) {
      case 'Group':
        let groupIdxEntry = {
          id              : n.getID(),
          name            : n.getFeature('name'),
          description     : n.getFeature('description'),
          organiserName   : n.getFeature('organiserName')
        };
        types.Groups.push(groupIdxEntry);
        break;
      case 'Topic':
        let topicIdxEntry = {
          id              : n.getID(),
          name            : n.getFeature('name'),
          urlkey          : n.getFeature('urlkey')
        };
        types.Topics.push(topicIdxEntry);
        break;
      case 'Member':
        let memberIdxEntry = {
          id              : n.getID(),
          name            : n.getFeature('name')
        };
        types.Members.push(memberIdxEntry);
        break;
      case 'Event':
        let eventIdxEntry = {
          id              : n.getID(),
          name            : n.getFeature('name'),
          description     : n.getFeature('description')
        };
        types.Events.push(eventIdxEntry);
        break;
      default:
        console.log(`Node Type not supported in Meetup scenario...!`);
        return false;
    }
  });
  Object.keys(types).forEach(k => console.log(`${types[k].length} nodes of type ${k} registered.`));

  indexes.groupIdx = new JsSearch.Search('id');
  indexes.groupIdx.addIndex('name');
  indexes.groupIdx.addIndex('description');
  indexes.groupIdx.addIndex('organiserName');
  indexes.groupIdx.addDocuments(types.Groups);

  indexes.topicIdx = new JsSearch.Search('id');
  indexes.groupIdx.addIndex('name');
  indexes.groupIdx.addIndex('urlkey');
  indexes.topicIdx.addDocuments(types.Topics);

  indexes.memberIdx = new JsSearch.Search('id');
  indexes.memberIdx.addIndex('name');
  indexes.memberIdx.addDocuments(types.Members);

  indexes.eventIdx = new JsSearch.Search('id');
  indexes.groupIdx.addIndex('name');
  indexes.groupIdx.addIndex('description');
  indexes.eventIdx.addDocuments(types.Events);

  window.idxJSSearch = indexes;
  return indexes;
}


export {
  buildIndexesJSSearch
}