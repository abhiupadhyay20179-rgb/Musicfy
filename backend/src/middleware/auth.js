import jwt from "jsonwebtoken";

const authMiddlewares = async (req, res , next) => {
    const token = req.headers.token;
if (!token){
    return res.json({success: false , message: "not Authorized. Login Again"});

}
try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)
    req.userId = token_decode.id;
    if (req.body){
        req.body.userId =  token_decode.id;
    }
    next();
} catch (error) {
    console.log(error);
    res.json({success:false , message:"error / invalid token"});
}
}

export default authMiddlewares;
