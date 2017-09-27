'use strict';
const express = require('express');
const graphqlHTTP =  require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();
const videoType = new GraphQLObjectType({
    name: 'Video',
    decription: 'This is new Video',
    fields: {
        id: {
            type: GraphQLID,
            description: 'Id of video'
        },
        title: {
            type: GraphQLString,
            description: 'Title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'Duration of the video'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'If video was viewed'
        }
    }
});
const queryType =  new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        video: {
            type: videoType,
            resolve: () => new Promise((resolve) => {
                resolve({
                    id: 1,
                    title: 'Learning Angular',
                    duration: 30,
                    watched: false
                });
            })
        }
    }
});
const schema =  new GraphQLSchema({
    query: queryType
});

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

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});