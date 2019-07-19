import * as path from 'path';
import { BaseGraph } from 'graphinius/lib/core/Graph';
import { importGraphFromFile } from '../helper/importGraph';
const meetupFile = path.join(__dirname, '../../test-data/meetupGraph.json');

const mug = importGraphFromFile(meetupFile);


function similarGroupsRecommender(graph: BaseGraph) {

}


export {
  similarGroupsRecommender
}
