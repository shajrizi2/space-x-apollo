const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launches',
    fields: () => ({
        id: { type: GraphQLString },
        details: { type : GraphQLString},
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType }
    })
});

// Rocket type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
})

// Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacex.land/rest/launches')
                    .then(res => res.data);
            }
        },
        launch: { 
            type: LaunchType,
            args: { 
                id: { type: GraphQLString}
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacex.land/rest/launch/${args.id}`)
                .then(res => res.data);
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})