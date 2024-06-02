import cors from "cors";
import express from "express";

const PORT = process.env.PORT || 3001;
const FE_URL = process.env.FE_URL || "http://localhost:3000";

const init = () => {
  const app = express();

  const corsOptions = {
    origin: FE_URL,
  };

  app.use(cors(corsOptions));

  app.listen(PORT, () => console.log("server running..."));

  return app;
};

export default { init };
