const jwt = require("jsonwebtoken");
const config = require("../config/config");


  
    const verifyToken = (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers["authorization"];
      
        if (!token) {
          return res.status(403).send({success:false, message: "No token provided!" });
        }
      
        jwt.verify(token,config.secret_jwt,
                  (err, decoded) => {
                    if (err) {
                      return res.status(401).send({
                        message: "Unauthorized!",
                      });
                    }
                    req.user = decoded;
                    next();
                  });
      };



module.exports = verifyToken;