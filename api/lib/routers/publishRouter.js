"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../models/user");
var publishRouter = /** @class */ (function () {
    function publishRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * publish
     */
    publishRouter.prototype.publish = function (req, res) {
        var streamKey = req.body.name;
        // Should return 2xx to allow, 3xx to redirect, anything else to deny.
        // Check if streamkey exists.
        user_1.default.findOneAndUpdate({ streamKey: streamKey }, { "channel.live": true })
            .then(function (data) {
            if (data !== null) {
                res.set("location", data.username);
                res.status(302).send();
            }
            else {
                // res.sendStatus(418);
                res.status(418).send("I'm a honeypot Kappa");
            }
        })
            .catch(function (err) {
            console.log("How did we get in here?");
            res.sendStatus(418);
        });
    };
    /**
     * publishDone
     */
    publishRouter.prototype.publishDone = function (req, res) {
        var streamKey = req.body.name;
        // Set the stream offline
        user_1.default.findOneAndUpdate({ streamKey: streamKey }, { "channel.live": false })
            .then(function (data) {
            // Don't really have to send this
            res.sendStatus(200);
        })
            .catch(function (err) {
            console.log("How did we get in here?");
            res.sendStatus(418);
        });
    };
    publishRouter.prototype.routes = function () {
        this.router.post("/", this.publish);
        this.router.post("/done", this.publishDone);
    };
    return publishRouter;
}());
var publishRoutes = new publishRouter();
publishRoutes.routes();
exports.default = publishRoutes.router;
//# sourceMappingURL=publishRouter.js.map