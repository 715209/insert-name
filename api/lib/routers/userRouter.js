"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const uid = require("uid-safe");
const authenticate_1 = require("../Middlewares/authenticate");
class userRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * getUsers
     */
    getUsers(req, res) {
        user_1.default.find({})
            .then(data => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch(err => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    /**
     * getUser
     */
    getUser(req, res) {
        const username = req.params.username;
        user_1.default.findOne({ username })
            .then(data => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch(err => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    /**
     * getCurrentUser
     */
    getCurrentUser(req, res) {
        // const username: string = res.locals.username;
        const twitchId = res.locals.twitchId;
        user_1.default.findOne({ "twitch.id": twitchId })
            .then(data => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch(err => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    /**
     * createUser
     */
    createUser(req, res) {
        const username = req.body.username;
        const password = req.body.password; // TODO hash or something
        const email = req.body.email;
        const streamKey = uid.sync(39);
        const admin = req.body.admin;
        const user = new user_1.default({
            username,
            password,
            email,
            streamKey,
            admin
        });
        user.save()
            .then(data => {
            const status = res.statusCode;
            req.session.userId = data._id;
            res.json({
                status,
                data
            });
        })
            .catch(err => {
            const status = 400;
            res.status(status).json({
                status,
                err
            });
        });
    }
    /**
     * updateUser
     * TODO: Should probably disallow to change like their id
     */
    updateUser(req, res) {
        const username = req.params.username;
        if (res.locals.isAdmin || username === res.locals.username) {
            user_1.default.findOneAndUpdate({ username }, req.body)
                .then(data => {
                const status = res.statusCode;
                res.json({
                    status,
                    data
                });
            })
                .catch(err => {
                const status = res.statusCode;
                res.json({
                    status,
                    err
                });
            });
        }
        else {
            res.status(403).json({ errors: "Unauthorized" });
        }
    }
    /**
     * deleteUser
     */
    deleteUser(req, res) {
        const username = req.params.username;
        if (res.locals.isAdmin || username === res.locals.username) {
            user_1.default.findOneAndRemove({ username })
                .then(data => {
                const status = res.statusCode;
                res.json({
                    status,
                    data
                });
            })
                .catch(err => {
                const status = res.statusCode;
                res.json({
                    status,
                    err
                });
            });
        }
        else {
            res.status(403).json({ errors: "Unauthorized" });
        }
    }
    routes() {
        this.router.get("/", this.getUsers);
        this.router.get("/me", authenticate_1.default, this.getCurrentUser);
        this.router.get("/:username", this.getUser);
        this.router.post("/", this.createUser);
        this.router.put("/:username", authenticate_1.default, this.updateUser);
        this.router.delete("/:username", authenticate_1.default, this.deleteUser);
    }
}
const userRoutes = new userRouter();
userRoutes.routes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRouter.js.map