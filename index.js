'use strict';
const express = require('express');
const graphqlHTTP =  require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');
const { getVideoById, getVideos, createVideo } = require('./src/data');
const {
    globalIdField,
    connectionDefinitions,
    connectionFromPromisedArray,
    connectionArgs
} = require('graphql-relay');
const { nodeInterface, nodeField } = require('./src/node');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    decription: 'This is new Video',
    fields: {
        id: globalIdField(),
        title: {
            type: GraphQLString,
            description: 'Title of the video'
        },
        duration: {
            type: GraphQLInt,
            description: 'Du ration of the video'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'If video was viewed'
        }
    },
    interfaces: [nodeInterface]
});
exports.videoType = videoType;

const { connectionType: VideoConnection } = connectionDefinitions({
    nodeType: videoType,
    connectionFields: () => ({
        totalCount: {
            type: GraphQLInt,
            description: 'Total of videos',
            resolve: (conn) => {
                return conn.edges.length;
            } 
        }
    })
});

const queryType =  new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type',
    fields: {
        node: nodeField,
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
            }
        },
        videos: {
            type: VideoConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromPromisedArray(
                getVideos(),
                args
            )
        }
    }
});
const videoInputType =  new GraphQLInputObjectType({
    name: 'VideoInput',
    fields: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Title of the video'
        },
        duration: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'Duration of the video'
        },
        watched: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'If video was viewed'
        }
    }
});
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Ther root mutation type',
    fields: {
        createVideo: {
            type: videoType,
            args: {
                video: {
                    type: new GraphQLNonNull(videoInputType)
                }
            },
            resolve: (_, args) => {
                return createVideo(args.video);
            }
        }
    }
});
const schema =  new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});