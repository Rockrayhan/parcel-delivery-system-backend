"use strict";
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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.create(userData);
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find();
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findById(id);
});
const getMe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).select("-password");
    return {
        data: user
    };
});
const setBlockStatus = (userId, isBlocked) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked }, { new: true, runValidators: true });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndDelete(id);
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    setBlockStatus,
    getMe,
};
