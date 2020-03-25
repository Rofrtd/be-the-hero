const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const ngo_id = req.headers.authorization;

    const cases = await connection("cases")
      .where("ngo_id", ngo_id)
      .select("*");

    return res.json(cases);
  }
};
