"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        default: "",
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        default: "",
        required: true,
        select: false
    },
    email: {
        type: String,
        default: "",
        unique: true,
        required: true,
        select: false
    },
    streamKey: {
        type: String,
        default: "",
        required: true,
        unique: true,
        select: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    channel: {
        required: false,
        live: {
            type: Boolean,
            required: true,
            default: false
        },
        title: {
            type: String,
            required: true,
            default: "edfjdiojf"
        }
    }
}, { timestamps: true });
exports.default = mongoose_1.model("User", userSchema);
//# sourceMappingURL=user.js.map