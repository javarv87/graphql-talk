'use strict';
const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
}
type Query {
    video: Video
    videos: [Video]
}
type Schema {
    query: Query
}
`);

const videoA = {
    id: 1,
    title: 'Learning Angular',
    duration: 30,
    watched: false
};
const videoB = {
    id: 2,
    title: 'Learning GraphQL',
    duration: 60,
    watched: true
};
const videos = [videoA, videoB];

const resolvers = {
    video: () => ({
        id: () => '1',
        title: () => 'foo',
        duration: () => 180,
        watched: () => true
    }),
    videos: () => videos
};

const query = `
query myFirstQuery {
    videos {
        id
        title
        duration
        watched 
    }
}
`;

graphql(schema, query, resolvers)
.then((result) => console.log(result))
.catch((err) => console.log(err))