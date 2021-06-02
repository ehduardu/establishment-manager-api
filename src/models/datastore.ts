import { Datastore } from '@google-cloud/datastore';

const projectId = process.env.PROJECT_ID;

const datastore = new Datastore({
  projectId,
});

export { datastore }
