


const  { GraphQLSchema, GraphQLObjectType, GraphQLString, buildSchema } = require('graphql');
const graphql = require("graphql")


const { createHandler } = require('graphql-http/lib/use/express');
const { typeDefs } = require('./schema');


/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
const schema = new GraphQLSchema({
  // query: new GraphQLObjectType({
  //   name: 'Query',
  //   fields: {
  //     hello: {
  //       type: GraphQLString,
  //       resolve: (args) => {
  //         console.log(  'hello ->args -> ', args);
  //         return 'world';
  //       },
  //     },
  //     test1: {
  //       type: GraphQLString,
  //       // resolve: (args) => 'test 1 data',
  //       args: {
  //         id: GraphQLString
  //       },
  //       resolve: (args) => {
  //         console.log(  'test1 -> args -> ', args);
  //         return 'test 1 data';
  //       },
  //     },
  //   },
  // }),

  // types: [
  //   {
  //     name: 'User',
      
  //   }
  // ]

  
});


const schema2 = buildSchema(
  `
    type Query {
      rollDice(numDice: Int!, numSides: Int): [Int]
    }
  `,
  {

  }
)

//-----------------
/*
  https://graphql.org/graphql-js/constructing-types/
*/
// Define the User type
var userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  },
})

// Define the Query type
var queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      // `args` describes the arguments that the `user` query accepts
      args: {
        id: { type: graphql.GraphQLString },
      },
      resolve: (_, { id }) => {
        console.log('_ -> ', _)
        console.log('id -> ', id)
        // return fakeDatabase[id]
        // return `your id is -> ${id}`
        return {
          name: 'sdsdsd',
          id: `your id is -> ${id}`,
          additionalParam: Math.random()
        }
      },
    },
  },
})
//-----------------


function createGraphQLHandlerViaGraphQLHttp () {
  // const handler = createHandler({schema})
  // const handler = createHandler({schema: schema2})
  const handler = createHandler({schema: new GraphQLSchema({
    query: queryType
  })})
  return handler;
}


module.exports = { createGraphQLHandlerViaGraphQLHttp }