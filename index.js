const axios = require("axios");
const server = require("./public/server");
const { EXCHANGE_URL } = require("./public/urls");

const app = server.init();

app.get("/", async (req, res) => {
  res.send("working...");
});

app.get("/exchange", async (req, res) => {
  const { baseCurrency, quoteCurrency, baseAmount } = req.query;
  var rates = null;

  if (baseCurrency && quoteCurrency && baseAmount) {
    try {
      const response = await axios.get(EXCHANGE_URL);
      rates = response.data.rates;
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch exchange rates", error });
    }
  }

  res.json(rates);
});
