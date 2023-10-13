const jwt = require("jsonwebtoken")
const secrteKey = process.env.JWT_SECRTE_KEY
function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ success: false, message: "Access Denied" })
    jwt.verify(token, secrteKey, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "Invalid Token", err })
        next();
    })
}
module.exports = authenticateToken;