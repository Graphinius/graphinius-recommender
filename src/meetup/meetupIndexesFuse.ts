import { MeetupIndexesFuse } from '../common/interfaces';
import { IBaseNode } from 'graphinius/lib/core/Nodes';
import { IGraph, BaseGraph } from 'graphinius/lib/core/Graph';
import Fuse from 'fuse.js';

// console.log(Fuse);

const types = {
  Groups: [],
  Topics: [],
  Members: [],
  Events: []
};

const fuseCfg = {
  distance: 100,
  findAllMatches: false,
  id: 'id',
  includeMatches: false,
  includeScore: true,
  isCaseSensitive: false,
  location: 0,
  matchAllTokens: false,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  shouldSort: true,
  sortFn: (e,t) => e-t,
  threshold: 0.6,
  tokenSeparator: / +/g,
  tokenize: true,
  verbose: false
}


function buildIndexesFuse(graph: IGraph) : MeetupIndexesFuse {
  const indexes: MeetupIndexesFuse = {
    groupIdx: null,
    topicIdx: null,
    memberIdx: null,
    eventIdx: null
  }

  Object.values(graph.getNodes()).forEach( n => {
    switch(n.getLabel()) {
      case 'Group':
        let groupIdxEntry = {
          id              : n.getID(),
          name            : n.getFeature('name'),
          description     : n.getFeature('description'),
          organiserName   : n.getFeature('organiserName')
        }
        types.Groups.push(groupIdxEntry);
        break;
      case 'Topic':
        let topicIdxEntry = {
          id              : n.getID(),
          name            : n.getFeature('name'),
          urlkey          : n.getFeature('urlkey')
        }
        types.Topics.push(topicIdxEntry);
        break;
      case 'Member':
        let memberIdxEntry = {
          id              : n.getID(),
          name            : n.getFeature('name')
        }
        types.Members.push(memberIdxEntry);
        break;
      case 'Event':
        let eventIdxEntry = {
          id              : n.getID(),
          name            : n.getFeature('name'),
          description     : n.getFeature('description')
        }
        types.Events.push(eventIdxEntry);
        break;
      default:
        console.log(`Node Type not supported in Meetup scenario...!`);
        return false;
    }
  });
  Object.keys(types).forEach(k => console.log(`${types[k].length} nodes of type ${k} registered.`));

  indexes.groupIdx = new Fuse(types.Groups, {keys: ['name', 'description', 'organiserName'], ...fuseCfg});
  indexes.topicIdx = new Fuse(types.Topics, {keys: ['name', 'urlkey'], ...fuseCfg});
  indexes.memberIdx = new Fuse(types.Members, {keys: ['name'], ...fuseCfg});
  indexes.eventIdx = new Fuse(types.Events, {keys: ['name', 'description'], ...fuseCfg});

  window.idxFuse = indexes;
  return indexes;
}


export {
  buildIndexesFuse
}