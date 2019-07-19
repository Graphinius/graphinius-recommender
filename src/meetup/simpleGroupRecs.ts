import * as path from 'path';
import { BaseGraph } from 'graphinius/lib/core/Graph';
import { importGraphFromFile } from '../helpers/importGraph';
const meetupFile = path.join(__dirname, '../../public/test-data/meetupGraph.json');

const mug = importGraphFromFile(meetupFile);


function similarGroupsRec(graph: BaseGraph) {

}


export {
  similarGroupsRec as similarGroupsRecommender
}
