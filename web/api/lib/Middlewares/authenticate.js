"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
exports.default = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).json({ errors: "Invalid token" });
    }
    else {
        user_1.default.findById(req.session.userId)
            .select("admin twitch.id")
            .then((data) => {
            res.locals.isAdmin = data.admin;
            // let's use twitch id for now
            res.locals.twitchId = data.twitch.id;
            next();
        })
            .catch(err => {
            console.log("How did we get here", err);
        });
    }
};
//# sourceMappingURL=authenticate.js.map