import { Router, Request, Response, NextFunction } from "express";
import User from "../models/user";
import auth from "../Middlewares/authenticate";
import * as uid from "uid-safe";
import fetch from "node-fetch";

class authRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * authenticate
     */
    public authenticate(req: Request, res: Response): void {
        const username: string = req.body.username;
        const password: string = req.body.password;

        User.findOne({ username })
            .select("username admin password")
            .then((data: any) => {
                if (data.password === password) {
                    const { _id, username, admin } = data;

                    req.session.userId = _id;
                    res.status(200).json({
                        _id,
                        username,
                        admin
                    });
                } else {
                    res.status(401).json({ errors: "Invalid username or password" });
                }
            })
            .catch(err => {
                res.status(401).json({ errors: "Invalid username or password" });
            });
    }

    /**
     * Twitch authenticate
     */
    public authenticateTwitch(req: Request, res: Response): void {
        const state = uid.sync(26);
        req.session.oauthState = state;
        const scopes = ["channel:read:subscriptions"];

        res.redirect(
            `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${
                process.env.REDIRECT_URI
            }&response_type=code&scope=${scopes.join("+")}&state=${state}`
        );
    }

    /**
     * Twitch authenticate callback
     */
    public async authenticateTwitchCallback(req: Request, res: Response) {
        console.log(req.session.oauthState);
        console.log("params:", req.query);

        if (req.query.error) {
            console.log(req.query);
        }

        if (req.session.oauthState !== req.query.state) {
            // error
            console.log("Error: oauth session state and query state aren't the same.");
        }

        try {
            const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${
                req.query.code
            }&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}`;
            const getAuthCode = await fetch(authUrl, { method: "POST" });
            const authCodeRes = await getAuthCode.json();

            if (getAuthCode.ok) {
                console.log("User logged in", authCodeRes);
                const { access_token, refresh_token, scope, token_type } = authCodeRes;

                // grab user data from twitch api and create/update user
                const getUser = await fetch(`https://api.twitch.tv/helix/users`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                const userRes = await getUser.json();

                if (getUser.ok) {
                    const { id, login, email, profile_image_url } = userRes.data[0];
                    console.log(id);
                    User.findOneAndUpdate(
                        { "twitch.id": id },
                        {
                            twitch: { id, login, email, profile_image_url },
                            twitchOauth: { access_token, refresh_token, scope, token_type, lastUsed: Date.now() }
                        },
                        { upsert: true, new: true, setDefaultsOnInsert: true }
                    )
                        .then((data: any) => {
                            console.log(data);
                            console.log("dasfdasf", data._id);
                            req.session.userId = data._id;
                            res.redirect(process.env.DOMAIN);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        } catch (error) {
            console.log(error);
            res.redirect(process.env.DOMAIN);
        }
    }

    /**
     * logout
     */
    public logout(req: Request, res: Response): void {
        req.session.destroy(e => {
            if (e) console.log("Something went wrong");
        });

        res.clearCookie("sid");
        res.sendStatus(200);
    }

    routes() {
        this.router.post("/", this.authenticate);
        this.router.post("/logout", auth, this.logout);
        this.router.get("/twitch", this.authenticateTwitch);
        this.router.get("/twitch/callback", this.authenticateTwitchCallback);
    }
}

const authRoutes = new authRouter();
authRoutes.routes();

export default authRoutes.router;
