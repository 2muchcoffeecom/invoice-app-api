import express from "express";

export default function(app: express.Express) {

  // All undefined routes should return a 404
  app.route("/*").get((req, res) => {
    res.status(404).send("Page not found");
  });
}