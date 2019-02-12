"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../models/user");
var uid = require("uid-safe");
var authenticate_1 = require("../Middlewares/authenticate");
var userRouter = /** @class */ (function () {
    function userRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * getUsers
     */
    userRouter.prototype.getUsers = function (req, res) {
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
    /**
     * getUser
     */
    userRouter.prototype.getUser = function (req, res) {
        var username = req.params.username;
        user_1.default.findOne({ username: username })
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
    /**
     * getCurrentUser
     */
    userRouter.prototype.getCurrentUser = function (req, res) {
        var username = res.locals.username;
        user_1.default.findOne({ username: username })
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
    /**
     * createUser
     */
    userRouter.prototype.createUser = function (req, res) {
        var username = req.body.username;
        var password = req.body.password; // TODO hash or something
        var email = req.body.email;
        var streamKey = uid.sync(39);
        var admin = req.body.admin;
        var user = new user_1.default({
            username: username,
            password: password,
            email: email,
            streamKey: streamKey,
            admin: admin
        });
        user
            .save()
            .then(function (data) {
            var status = res.statusCode;
            req.session.userId = data._id;
            res.json({
                status: status,
                data: data
            });
        })
            .catch(function (err) {
            var status = 400;
            res.status(status).json({
                status: status,
                err: err
            });
        });
    };
    /**
     * updateUser
     * TODO: Should probably disallow to change like their id
     */
    userRouter.prototype.updateUser = function (req, res) {
        var username = req.params.username;
        if (res.locals.isAdmin || username === res.locals.username) {
            user_1.default.findOneAndUpdate({ username: username }, req.body)
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
        }
        else {
            res.status(403).json({ errors: "Unauthorized" });
        }
    };
    /**
     * deleteUser
     */
    userRouter.prototype.deleteUser = function (req, res) {
        var username = req.params.username;
        if (res.locals.isAdmin || username === res.locals.username) {
            user_1.default.findOneAndRemove({ username: username })
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
        }
        else {
            res.status(403).json({ errors: "Unauthorized" });
        }
    };
    userRouter.prototype.routes = function () {
        this.router.get("/", this.getUsers);
        this.router.get("/me", authenticate_1.default, this.getCurrentUser);
        this.router.get("/:username", this.getUser);
        this.router.post("/", this.createUser);
        this.router.put("/:username", authenticate_1.default, this.updateUser);
        this.router.delete("/:username", authenticate_1.default, this.deleteUser);
    };
    return userRouter;
}());
var userRoutes = new userRouter();
userRoutes.routes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRouter.js.map