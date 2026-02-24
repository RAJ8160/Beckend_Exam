import { Role } from "../models/role.model.js";

export const role = (...roles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        if (!roles.includes(req.user.role_id.name)) {
            return res.status(403).json({
                message: "Forbidden - Access denied"
            });
        }
        next();
    }
}