const database = require("../database");

class LinkService {
  getById = async (id) => await database("links").where({ id }).first();
  getAll = async () => await database("links");

  search = async (data) => {
    const response = await database("links").where({
      ...(data.label ? { label: data.label } : {}),
      ...(data.url ? { url: data.url } : {}),
      ...(typeof data.active === "boolean" ? { active: data.active } : {}),
    });

    return response;
  };

  create = async (data) => {
    return await database("links")
      .insert({ ...data, active: 1 })
      .returning("*")
      .then((response) => {
        return response[0];
      })
      .catch((error) => {
        throw new Error(error.detail);
      });
  };

  update = async (id, data) => {
    const response = await database("links")
      .where({ id })
      .update({ ...data })
      .returning("*");

    return response[0];
  };

  delete = async (id) => {
    const response = await database("links").where({ id }).del();
    if (response === 0) throw new Error("Registro inexistente");

    return true;
  };
}

module.exports = new LinkService();
