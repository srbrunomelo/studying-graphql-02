const LinkService = require("../../../services/LinkService");

module.exports = {
  Query: {
    link: async (obj, { id }, context, info) =>
      await context.linkService.getById(id),

    links: async (obj, args, context, info) =>
      await context.linkService.getAll(),

    search: async (obj, { data }, context, info) =>
      await context.linkService.search(data),
  },

  Mutation: {
    create: async (obj, { data }, context, info) =>
      await context.linkService.create(data),

    update: async (obj, { id, data }, context, info) =>
      await context.linkService.update(id, data),

    delete: async (obj, { id }, context, info) =>
      await context.linkService.delete(id),
  },
};
