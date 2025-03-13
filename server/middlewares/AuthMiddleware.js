import  jwt  from "jsonwebtoken";
export const verifyToken = (request, response, next) => {
    // console.log(request.cookies);
    const token = request.cookies.jwt;
    // console.log({ jwt });
    if(!token) {
        return response.status(401).send("You are not autheticated");
    };
    jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {
        if(err) return response.status(403).send("Invalid Token");
        request.userId = payload.userId;
        next();
    });
};