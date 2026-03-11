import jwt from "jsonwebtoken";

export const auth = (roles) => (request, response, next) => {
    try {
        const header = request.headers.authorization;

        if (!header) {
            return response.status(401).send({ message: "The header is missing :(" });
        }

        const token = header.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!roles.includes(decoded.roles)) {
            return response.status(403).send({ message: "Sorry, you don't have permission :(" });
        }

        request.agentId = decoded.id;
        request.userRole = decoded.role
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return response.status(401).send({ message: "Token expired, please login again" });
        }
        if (error.name === "JsonWebTokenError") {
            return response.status(401).send({ message: "Invalid token" });
        }

        response.status(500).send({ message: "Authorization Error :(", error: error.message });
    }
};