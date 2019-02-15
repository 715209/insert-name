import { Schema, model } from "mongoose";

let userSchema: Schema = new Schema(
    {
        twitch: {
            id: { type: String, default: "" },
            login: { type: String, default: "" },
            email: { type: String, default: "" },
            profile_image_url: { type: String, default: "" }
        },
        twitchOauth: {
            type: {
                access_token: String,
                refresh_token: String,
                scope: String,
                token_type: String,
                lastUsed: { type: Date, default: Date.now }
            },
            select: false
        },
        admin: {
            type: Boolean,
            default: false
        },
        obs: {
            ip: { type: String, default: "" },
            password: { type: String, default: "" },
            normalScene: { type: String, default: "" },
            offlineScene: { type: String, default: "" },
            lowBitrateScene: { type: String, default: "" },
            refreshScene: { type: String, default: "" },
            lowBitrateTrigger: { type: Number, default: 1000 },
            refreshSceneInterval: { type: Number, default: 2000 },
            requestMs: { type: Number, default: 2000 }
        },
        nginx: {
            ip: String
        },
        twitchChat: {
            enable: { type: Boolean, default: false },
            prefix: { type: String, default: "!" },
            enablePublicCommands: { type: Boolean, default: false },
            publicCommands: { type: Array, default: ["bitrate"] },
            enableModCommands: { type: Boolean, default: false },
            modCommands: { type: Array, default: ["refresh", "trigger", "sourceinfo", "obsinfo"] },
            enableAutoSwitchNotification: { type: Boolean, default: false },
            enableAutoStopStreamOnHostOrRaid: { type: Boolean, default: true }
        }
    },
    { timestamps: true }
);

export default model("User", userSchema);
