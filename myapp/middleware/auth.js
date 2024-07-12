exports.requireLogin = (req, res, next) => {
    console.log("Session: ", Object.keys(req.sessionStore.sessions).length === 0)
    if (Object.keys(req.sessionStore.sessions).length !== 0) {
        res.status(200).json({ success: 'Authorized'})
    } else {
        res.status(403).json({ error: 'Unauthorized'})
    }
}