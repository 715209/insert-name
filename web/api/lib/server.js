"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const session = require("express-session");
const connectMongo = require("connect-mongo");
// Import routers
const userRouter_1 = require("./routers/userRouter");
const authRouter_1 = require("./routers/authRouter");
// Server class
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = "mongodb://localhost/noalbs";
        const MongoStore = connectMongo(session);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: 200,
            reconnectInterval: 2000
        });
        mongoose.connection.on("error", e => {
            console.log(`Mongodb error ${e}`);
        });
        mongoose.connection.on("connected", e => {
            console.log("Mongodb connected");
        });
        mongoose.connection.on("disconnecting", () => {
            console.log("Mongodb disconnecting");
        });
        mongoose.connection.on("disconnected", () => {
            console.log("Mongodb disconnected");
        });
        mongoose.connection.on("reconnected", () => {
            console.log("Mongodb reconnected");
        });
        mongoose.connection.on("timeout", e => {
            console.log(`Mongodb timeout ${e}`);
        });
        mongoose.connection.on("close", () => {
            console.log("Mongodb connection closed");
        });
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger("dev"));
        this.app.use(compression());
        this.app.use(cors({ origin: process.env.DOMAIN, credentials: true }));
        this.app.use(session({
            store: new MongoStore({ mongooseConnection: mongoose.connection }),
            name: "sid",
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: !!+process.env.COOKIE_SECURE,
                maxAge: +process.env.COOKIE_MAXAGE,
                httpOnly: true
            }
        }));
    }
    routes() {
        let router;
        router = express.Router();
        router.get("/", (req, res) => {
            res.json({
                Error: "Nothing here 4Head"
            });
        });
        this.app.use("/", router);
        this.app.use("/v1/users", userRouter_1.default);
        this.app.use("/v1/auth", authRouter_1.default);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map