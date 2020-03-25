const express = require("express");

const NgoController = require("./controllers/NgoController");
const CaseController = require("./controllers/CaseController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", SessionController.create);

routes.get("/ngos", NgoController.index);
routes.post("/ngos", NgoController.create);

routes.get("/profile", ProfileController.index);

routes.get("/cases", CaseController.index);
routes.post("/cases", CaseController.create);
routes.delete("/cases/:id", CaseController.delete);

module.exports = routes;
