const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, resolvers } = require("./src/graphql");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  formatError: (err) => {
    // custom erros
    return err;
  },
});

server.listen().then(({ url }) => {
  console.log(url);
});
