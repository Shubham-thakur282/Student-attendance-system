const jwt = require("jsonwebtoken");
const config = process.env;


const auth = (req, res, next)=>{
    let token = req.body.token || req.query.token || req.headers["authorization"];
    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
    try {
        token = token.replace(/^Bearer\s+/,"");
        const decoded = jwt.verify(token,config.TOKEN_KEY);
        req.user = decoded;
        // req.user.role = decoded.role;
        next();
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
    return next();
}

const roleAuth = (role)=>{
    return (req, res, next)=>{
        if(req.user.role != role){
            return  res.status(403).send("Access denied");
        }
        return next();
    };
};

module.exports = {auth,roleAuth};   