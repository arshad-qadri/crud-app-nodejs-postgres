module.exports = (app) => {
  const tutorials = require("../controllers/controllers");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
