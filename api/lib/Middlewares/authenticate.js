"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
exports.default = (function (req, res, next) {
    if (!req.session.userId) {
        res.status(401).json({ errors: "Invalid token" });
    }
    else {
        user_1.default.findById(req.session.userId)
            .select("admin username")
            .then(function (data) {
            res.locals.isAdmin = data.admin;
            res.locals.username = data.username;
            next();
        })
            .catch(function (err) {
            console.log("How did we get here", err);
        });
    }
});
//# sourceMappingURL=authenticate.js.map