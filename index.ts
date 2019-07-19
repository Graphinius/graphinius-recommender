import { importGraphFromURL } from './src/helper/importGraph';
import { similarGroupsRecommender } from './src/meetup/simpleGroupRecs';

const meetupFile = './test-data/meetupGraph.json';

(async () => {

  const mug = await importGraphFromURL(meetupFile);
  console.log(mug.getStats());

})();