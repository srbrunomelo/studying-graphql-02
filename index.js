const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, resolvers } = require("./src/graphql");
const LinkService = require("./src/services/LinkService");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  formatError: (err) => {
    if (err.message.startsWith("Registro inexistente")) {
      return new Error(err.message);
    }

    if (err.message.startsWith("Key (url)=(www.vitoria.gov) already exists.")) {
      return new Error("URL existente");
    }

    return err;
  },
  context: () => ({
    linkService: LinkService,
  }),
});

server.listen().then(({ url }) => {
  console.log(url);
});
