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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const users_model_1 = require("./users.model");
const handelUsers = __importStar(require("./users.handler"));
const usersValidation = __importStar(require("./users.validation"));
const loginUser = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = reqBody;
    try {
        const userInstance = yield users_model_1.AdminUser.findOne({
            where: { username: username }
        });
        const user = userInstance.dataValues;
        if (!user.password) {
            return { content: { message: 'User not found' }, status: 404 };
        }
        if (yield handelUsers.comparePasswrd(password, user.password)) {
            return { user, status: 200 };
        }
        else {
            return { content: { message: 'Incorrect password' }, status: 401 };
        }
    }
    catch (err) {
        console.error(err);
        return { content: { message: 'Internal Server Error' }, status: 500 };
    }
});
exports.loginUser = loginUser;
const registerUser = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = reqBody;
    try {
        if (!usersValidation.newUserValidator(password)) {
            return { message: 'The password must contain 7 characters with at least one uppercase letter and one lowercase letter.', status: 400 };
        }
        else if (yield usersValidation.ifUserExisting(reqBody)) {
            return { message: 'User already exists', status: 409 };
        }
        const passwordHashed = yield handelUsers.hashPassword(password);
        const user = yield users_model_1.AdminUser.create({
            username: username,
            password: passwordHashed,
        });
        return { user: user, status: 201, message: 'User created seccefuly !' };
    }
    catch (error) {
        console.error('An error occurred while creating a new user:', error);
        throw error;
    }
});
exports.registerUser = registerUser;
