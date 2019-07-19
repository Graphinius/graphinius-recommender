import { importGraphFromURL } from './helper/importGraph';
import { similarGroupsRecommender } from './meetup/simpleGroupRecs';

const meetupFile = './test-data/meetupGraph.json';

(async () => {

  const mug = await importGraphFromURL(meetupFile);
  console.log(mug.getStats());

})();