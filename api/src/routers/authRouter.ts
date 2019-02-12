import { Router, Request, Response, NextFunction } from "express";
import User from "../models/user";
import auth from "../Middlewares/authenticate";
import * as uid from "uid-safe";

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

        res.redirect(
            `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${
                process.env.REDIRECT_URI
            }&response_type=code&scope=viewing_activity_read&state=${state}`
        );
    }

    /**
     * Twitch authenticate callback
     */
    public authenticateTwitchCallback(req: Request, res: Response): void {
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
