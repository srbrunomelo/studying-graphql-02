const database = require("../../../database");

module.exports = {
  Query: {
    link: async (_, { id }) => {
      const response = await database("links").where({ id }).first();

      return response;
    },
    links: async () => await database("links"),

    search: async (_, { data }) => {
      const response = await database("links").where({
        ...(data.label ? { label: data.label } : {}),
        ...(data.url ? { url: data.url } : {}),
        ...(typeof data.active === "boolean" ? { active: data.active } : {}),
      });

      return response;
    },
  },

  Mutation: {
    create: async (_, { data }) =>
      await (
        await database("links")
          .insert({ ...data, active: 1 })
          .returning("*")
      )[0],

    update: async (_, { id, data }) => {
      const response = await database("links")
        .where({ id })
        .update({ ...data })
        .returning("*");

      return response[0];
    },

    delete: async (_, { id }) => {
      const response = await database("links").where({ id }).del();

      if (response === 0) throw new Error("Registro inexistente");

      return true;
    },
  },
};
