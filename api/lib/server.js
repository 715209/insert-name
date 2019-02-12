"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");
var helmet = require("helmet");
var compression = require("compression");
var cors = require("cors");
var session = require("express-session");
// Import routers
var userRouter_1 = require("./routers/userRouter");
var authRouter_1 = require("./routers/authRouter");
// Server class
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        var MONGO_URI = "mongodb://localhost/noalbs";
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: 200,
            reconnectInterval: 2000
        });
        mongoose.connection.on("error", function (e) {
            console.log("Mongodb error " + e);
        });
        mongoose.connection.on("connected", function (e) {
            console.log("Mongodb connected");
        });
        mongoose.connection.on("disconnecting", function () {
            console.log("Mongodb disconnecting");
        });
        mongoose.connection.on("disconnected", function () {
            console.log("Mongodb disconnected");
        });
        mongoose.connection.on("reconnected", function () {
            console.log("Mongodb reconnected");
        });
        mongoose.connection.on("timeout", function (e) {
            console.log("Mongodb timeout " + e);
        });
        mongoose.connection.on("close", function () {
            console.log("Mongodb connection closed");
        });
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger("dev"));
        this.app.use(compression());
        this.app.use(cors({ origin: process.env.DOMAIN, credentials: true }));
        this.app.use(session({
            // store: TODO
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
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        this.app.use("/", router);
        this.app.use("/v1/users", userRouter_1.default);
        this.app.use("/v1/auth", authRouter_1.default);
    };
    return Server;
}());
exports.default = new Server().app;
//# sourceMappingURL=server.js.map