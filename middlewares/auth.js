const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const authHeader = req.headers["authorization"];

    // Ensure header is present and properly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.redirect("/login");
    }

    const token = authHeader.split("Bearer ")[1].trim();
    const user = getUser(token);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        req.user = null;
        return next();
    }

    const token = authHeader.split("Bearer ")[1].trim();
    const user = getUser(token);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};
