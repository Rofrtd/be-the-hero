const connection = require("../database/connection");
module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("cases").count();

    const cases = await connection("cases")
      .join("ngos", "ngo_id", "=", "cases.ngo_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "cases.*",
        "ngos.name",
        "ngos.email",
        "ngos.whatsapp",
        "ngos.city",
        "ngos.state"
      ]);

    res.header("X-Total-Count", count["count(*)"]);

    return res.json(cases);
  },
  async create(req, res) {
    const { title, description, value } = req.body;
    const ngo_id = req.headers.authorization;

    const [id] = await connection("cases ").insert({
      title,
      description,
      value,
      ngo_id
    });
    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ngo_id = req.headers.authorization;

    const casex = await connection("cases")
      .where("id", id)
      .select("ngo_id")
      .first();

    if (casex.ngo_id !== ngo_id) {
      return res.status(401).json({ error: "Operation not authorized" });
    }
    await connection("cases")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};
