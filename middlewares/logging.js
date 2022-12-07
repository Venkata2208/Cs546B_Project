module.exports = async (req, res, next) => {
    if (req.session.user) {
        console.log(`[${new Date().toUTCString()}] ${req.method} ${req.originalUrl} (Authenticated User)`);
    } else {
        console.log(`[${new Date().toUTCString()}] ${req.method} ${req.originalUrl} (Non-Authenticated User)`);
    }
    next();
};