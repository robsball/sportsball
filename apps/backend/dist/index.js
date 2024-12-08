"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Test Route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});
// Example Route to Fetch Users
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
