import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewires/validateRequest';
import { createUserZodSchema, toggleBlockUserZodSchema, updateUserZodSchema } from './user.validation';
import { checkAuth } from '../../middlewires/checkAuth';
import { UserRole } from './user.interface';

const router = express.Router();

router.post('/register', validateRequest(createUserZodSchema), UserController.createUser);
// router.get('/', UserController.getAllUsers);
router.get('/', checkAuth(UserRole.ADMIN), UserController.getAllUsers);
router.get("/me", checkAuth(...Object.values(UserRole)), UserController.getMe)
router.get('/:id', UserController.getSingleUser);
router.delete('/delete/:id', UserController.deleteUser);

// routes/user.route.ts or wherever UserRoutes is defined


router.patch('/block/:id', checkAuth(UserRole.ADMIN), UserController.blockUser);
router.patch('/unblock/:id', checkAuth(UserRole.ADMIN), UserController.unblockUser);



export const UserRoutes = router;
