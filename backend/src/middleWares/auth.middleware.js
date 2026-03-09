import jwt from "jsonwebtoken";
export const auth = (roles) => (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded || !roles.includes(decoded.roles)) throw new Error("Not Authorized ;(");
        request.agentId = decoded.id;
        next();
    } catch (error) {
        response.status(error.status || 500).send({ massage: "Authorization Error ;(", error: error.massage })
    }
}