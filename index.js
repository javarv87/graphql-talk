'use strict';
const { graphql, buildSchema } = require('graphql');
const graphqlHTTP =  require('express-graphql');
const express = require('express');

const PORT = process.env.PORT || 3000;
const server = express();

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

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolvers
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});