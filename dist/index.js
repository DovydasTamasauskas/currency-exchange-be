"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const server_1 = __importDefault(require("./public/server"));
const urls_1 = require("./public/urls");
const LRUCache_1 = __importDefault(require("./LRUCache"));
const app = server_1.default.init();
const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "ILS"];
const cache = new LRUCache_1.default(SUPPORTED_CURRENCIES.length);
app.get("/exchange", async (req, res) => {
    const { baseCurrency, quoteCurrency, baseAmount } = req.query;
    var rates = null;
    if (!baseCurrency ||
        !quoteCurrency ||
        !SUPPORTED_CURRENCIES.includes(baseCurrency) ||
        !SUPPORTED_CURRENCIES.includes(quoteCurrency))
        return res.status(400).json({
            error: "Currency is not supported by system",
        });
    if (!baseAmount || isNaN(baseAmount)) {
        return res.status(400).json({ error: "Excahnge amount is incorrect" });
    }
    rates = cache.get(baseCurrency);
    try {
        if (!rates) {
            const response = await axios_1.default.get(`${urls_1.EXCHANGE_URL}/${baseCurrency}`);
            rates = response.data.rates;
            cache.set(baseCurrency, rates);
        }
    }
    catch {
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
//# sourceMappingURL=index.js.map