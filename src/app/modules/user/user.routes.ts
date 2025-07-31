import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewires/validateRequest';
import { createUserZodSchema } from './user.validation';
import { checkAuth } from '../../middlewires/checkAuth';
import { UserRole } from './user.interface';

const router = express.Router();

router.post('/register', validateRequest(createUserZodSchema), UserController.createUser);
// router.get('/', UserController.getAllUsers);
router.get('/', checkAuth(UserRole.ADMIN), UserController.getAllUsers);
router.get('/:id', UserController.getSingleUser);
router.delete('/delete/:id', UserController.deleteUser);

export const UserRoutes = router;
