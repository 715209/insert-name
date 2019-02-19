import User from "../models/user";

export default (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).json({ errors: "Invalid token" });
    } else {
        User.findById(req.session.userId)
            .select("admin twitch.id")
            .then((data: any) => {
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
