const cors = require("cors");
const express = require("express");

const PORT = process.env.PORT || 3000;
const FE_URL = process.env.FE_URL || "http://localhost:3001";

const init = () => {
  const app = express();

  const corsOptions = {
    origin: FE_URL,
  };

  app.use(cors(corsOptions));

  app.listen(PORT, () => console.log("server running..."));

  return app;
};

module.exports = {
  init,
};
