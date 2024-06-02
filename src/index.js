import axios from "axios";
import server from "./public/server.js";
import { EXCHANGE_URL } from "./public/urls.js";
import LRUCache from "./LRUCache.js";

const app = server.init();

const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "ILS"];

const cache = new LRUCache(SUPPORTED_CURRENCIES.length);

app.get("/exchange", async (req, res) => {
  const { baseCurrency, quoteCurrency, baseAmount } = req.query;
  var rates = null;

  if (
    !baseCurrency ||
    !quoteCurrency ||
    !SUPPORTED_CURRENCIES.includes(baseCurrency) ||
    !SUPPORTED_CURRENCIES.includes(quoteCurrency)
  )
    return res.status(400).json({
      error: "Currency is not supported by system",
    });

  if (!baseAmount || isNaN(baseAmount)) {
    return res.status(400).json({ error: "Excahnge amount is incorrect" });
  }

  rates = cache.get(baseCurrency);
  try {
    if (!rates) {
      const response = await axios.get(`${EXCHANGE_URL}/${baseCurrency}`);
      rates = response.data.rates;
      cache.set(baseCurrency, rates);
    }
  } catch {
    return res.status(500).json({ error: "Failed to fetch" });
  }

  if (!rates[quoteCurrency] || !rates[baseCurrency])
    return res.status(400).json({ error: "Currency not supported" });

  const result = Math.round(baseAmount * rates[quoteCurrency] * 10) / 10; // to get extra decimal place

  res.json({ result });
});

app.get("/get/supported-currencies", async (req, res) => {
  res.json({ result: SUPPORTED_CURRENCIES });
});
