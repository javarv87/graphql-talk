'use strict';
const express = require('express');
const graphqlHTTP =  require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');
const { getVideoById, getVideos } = require('./src/data');

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
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'The id of the video'
                }
            },
            resolve: (_, args) => {
                return getVideoById(args.id);
            },
        },
        videos: {
            type: new GraphQLList(videoType),
            resolve: getVideos,
        }
    },
});
const schema =  new GraphQLSchema({
    query: queryType
});

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});