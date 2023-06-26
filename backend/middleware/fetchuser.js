var jwt = require("jsonwebtoken");
const JWT_SECRET = "DPkaStylehai"
const fetchuser = (req,res,next)=>{
    //get user from auth jwt token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"authencate properly"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        // console.log(data);
    req.user = data.user
    next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using valid token"})
    }
}

module.exports = fetchuser