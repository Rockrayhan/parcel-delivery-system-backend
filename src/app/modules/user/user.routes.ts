import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewires/validateRequest';
import { createUserZodSchema } from './user.validation';

const router = express.Router();

router.post('/register', validateRequest(createUserZodSchema), UserController.createUser);
// router.post('/register', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getSingleUser);
router.delete('/delete/:id', UserController.deleteUser);

export const UserRoutes = router;
