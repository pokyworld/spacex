const axios = require("axios");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: { type: GraphQLNonNull(GraphQLInt) },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_unix: { type: GraphQLInt },
        launch_date_utc: { type: GraphQLString },
        rocket: { type: RocketType },
        launch_success: { type: GraphQLBoolean },
        launch_site: { type: LaunchSiteType },
        launch_failure_reason: { type: LaunchFailureType }
    })
});
// Rocket Type
const RocketType = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        rocket_id: { type: GraphQLNonNull(GraphQLString) },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    })
});
const LaunchSiteType = new GraphQLObjectType({
    name: "Site",
    fields: () => ({
        site_id: { type: GraphQLNonNull(GraphQLString) },
        site_name: { type: GraphQLString },
        site_name_long: { type: GraphQLString }
    })
});

const LaunchFailureType = new GraphQLObjectType({
    name: "Failure",
    fields: () => ({
        time: { type: GraphQLInt },
        altitude: { type: GraphQLInt },
        reason: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        test: {
            type: GraphQLString,
            args: {},
            resolve: (parentValue, args) => {
                return "This GraphQL Server is working";
            }
        },
        launches: {
            type: GraphQLList(LaunchType),
            args: {},
            resolve: (parentValue, args) => {
                // Get data from SpaceX
                const url = `https://api.spacexdata.com/v3/launches?sort=launch_date_utc&order=desc`;
                return axios.get(url)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve: (parentValue, args) => {
                const url = `https://api.spacexdata.com/v3/launches/${args.flight_number}?sort=launch_date_utc&order=desc`;
                return axios.get(url)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        rockets: {
            type: GraphQLList(RocketType),
            args: {},
            resolve: (parentValue, args) => {
                // Get data from SpaceX
                const url = `https://api.spacexdata.com/v3/rockets`;
                return axios.get(url)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        rocket: {
            type: RocketType,
            args: {
                rocket_id: { type: GraphQLString }
            },
            resolve: (parentValue, args) => {
                const url = `https://api.spacexdata.com/v3/rockets/${args.rocket_id}`;
                return axios.get(url)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        }
    }
});

// const mutation = new GraphQLObjectType({
//     name: "Mutation",
//     fields: {
//         add: {},
//         update: {},
//         delete: {}
//     }
// }

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation
});