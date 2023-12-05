"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = __importStar(require("./users.service"));
const secretKey = process.env.SECRET_KEY;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn: '3h' });
};
const loginUser = (loginUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFromDb = yield userService.loginUser(loginUser);
        if (userFromDb.status === 200) {
            const token = generateToken(userFromDb.user.userId);
            const tokenString = token.toString();
            return {
                status: userFromDb.status,
                token: tokenString,
            };
        }
        else {
            return {
                status: userFromDb.status,
                message: userFromDb.content,
            };
        }
    }
    catch (err) {
        console.error(err);
        return {
            status: 500,
            message: 'Internal Server Error',
        };
    }
});
exports.loginUser = loginUser;
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCreationResult = yield userService.registerUser(user);
        if (userCreationResult.status === 201) {
            return {
                status: userCreationResult.status,
                user: userCreationResult.user,
                message: userCreationResult.message
            };
        }
        else {
            return {
                status: userCreationResult.status,
                message: userCreationResult.message
            };
        }
    }
    catch (error) {
        console.error('An error occurred while processing the request:', error);
        return {
            status: 500,
            message: 'An error occurred while processing the request',
        };
    }
});
exports.registerUser = registerUser;
