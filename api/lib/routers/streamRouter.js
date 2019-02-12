"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../models/user");
var streamRouter = /** @class */ (function () {
    function streamRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * getStreams
     */
    streamRouter.prototype.getStreams = function (req, res) {
        user_1.default.find({})
            .then(function (data) {
            var status = res.statusCode;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = res.statusCode;
            res.json({
                status: status,
                err: err
            });
        });
    };
    streamRouter.prototype.routes = function () {
        this.router.get("/", this.getStreams);
    };
    return streamRouter;
}());
var streamRoutes = new streamRouter();
streamRoutes.routes();
exports.default = streamRoutes.router;
//# sourceMappingURL=streamRouter.js.map