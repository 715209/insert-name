"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../models/user");
var authenticate_1 = require("../Middlewares/authenticate");
var uid = require("uid-safe");
var authRouter = /** @class */ (function () {
    function authRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * authenticate
     */
    authRouter.prototype.authenticate = function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        user_1.default.findOne({ username: username })
            .select("username admin password")
            .then(function (data) {
            if (data.password === password) {
                var _id = data._id, username_1 = data.username, admin = data.admin;
                req.session.userId = _id;
                res.status(200).json({
                    _id: _id,
                    username: username_1,
                    admin: admin
                });
            }
            else {
                res.status(401).json({ errors: "Invalid username or password" });
            }
        })
            .catch(function (err) {
            res.status(401).json({ errors: "Invalid username or password" });
        });
    };
    /**
     * Twitch authenticate
     */
    authRouter.prototype.authenticateTwitch = function (req, res) {
        var state = uid.sync(26);
        req.session.oauthState = state;
        res.redirect("https://id.twitch.tv/oauth2/authorize?client_id=" + process.env.CLIENT_ID + "&redirect_uri=" + process.env.REDIRECT_URI + "&response_type=code&scope=viewing_activity_read&state=" + state);
    };
    /**
     * Twitch authenticate callback
     */
    authRouter.prototype.authenticateTwitchCallback = function (req, res) {
        console.log(req.session.oauthState);
        console.log("params:", req.query);
        if (req.query.error) {
            console.log(req.query);
        }
        if (req.session.oauthState !== req.query.state) {
            // error
            console.log("Error: oauth session state and query state aren't the same.");
        }
        // check if user exists else create
        res.redirect("/");
        // res.status(200).json(req.query);
    };
    /**
     * logout
     */
    authRouter.prototype.logout = function (req, res) {
        req.session.destroy(function (e) {
            if (e)
                console.log("Something went wrong");
        });
        res.clearCookie("sid");
        res.sendStatus(200);
    };
    authRouter.prototype.routes = function () {
        this.router.post("/", this.authenticate);
        this.router.post("/logout", authenticate_1.default, this.logout);
        this.router.get("/twitch", this.authenticateTwitch);
        this.router.get("/twitch/callback", this.authenticateTwitchCallback);
    };
    return authRouter;
}());
var authRoutes = new authRouter();
authRoutes.routes();
exports.default = authRoutes.router;
//# sourceMappingURL=authRouter.js.map