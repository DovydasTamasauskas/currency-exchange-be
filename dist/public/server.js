"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3001;
const FE_URL = process.env.FE_URL || "http://localhost:3000";
const init = () => {
    const app = (0, express_1.default)();
    const corsOptions = {
        origin: FE_URL,
    };
    app.use((0, cors_1.default)(corsOptions));
    app.listen(PORT, () => console.log("server running..."));
    return app;
};
exports.default = { init };
//# sourceMappingURL=server.js.map