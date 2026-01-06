"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error-middleware");
const route_1 = require("./modules/auth/route");
const route_2 = require("./modules/event/route");
const route_3 = require("./modules/user/route");
const app = (0, express_1.default)();
// --- Global Middlewares ---
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// --- API Routes ---
app.use('/api', route_1.AuthRoutes);
app.use('/api', route_2.EventRoutes);
app.use('/api', route_3.UserRoutes);
// --- Health Check ---
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});
// --- Global Error Handler ---
app.use(error_middleware_1.errorMiddleware);
// --- Start Server ---
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
//# sourceMappingURL=main.js.map