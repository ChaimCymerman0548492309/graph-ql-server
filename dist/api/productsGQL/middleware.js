"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        next();
    });
}
exports.authenticateToken = authenticateToken;
;
