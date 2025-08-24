"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middlewires/validateRequest");
const user_validation_1 = require("./user.validation");
const checkAuth_1 = require("../../middlewires/checkAuth");
const user_interface_1 = require("./user.interface");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.validateRequest)(user_validation_1.createUserZodSchema), user_controller_1.UserController.createUser);
// router.get('/', UserController.getAllUsers);
router.get('/', (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), user_controller_1.UserController.getAllUsers);
router.get("/me", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), user_controller_1.UserController.getMe);
router.get('/:id', user_controller_1.UserController.getSingleUser);
router.delete('/delete/:id', user_controller_1.UserController.deleteUser);
// routes/user.route.ts or wherever UserRoutes is defined
router.patch('/block/:id', (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(user_validation_1.updateUserZodSchema), user_controller_1.UserController.toggleBlockUser);
exports.UserRoutes = router;
