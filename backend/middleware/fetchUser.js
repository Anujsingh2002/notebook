const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    //get user from jwt token and add it to req object 
    const token = req.header('authToken');
    
    if (!token) {
        res.status(401).send({ error: "not a valid token" });
    }
    try {
        const data = jwt.verify(token, "secret");
        // console.log(req.user,data.user) //
        req.user = data.user;
        // console.log(req,data.user) 
        next();
    } catch (err) {
        res.status(401).send({ error: "not a valid token" });
    }

}

module.exports = fetchUser;