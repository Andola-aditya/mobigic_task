import { Router } from 'express';
import * as userController from '../controller/users';
const router = Router();

/**
 * POST /api/v1/users/register
 */
router.post('/register',userController.create);
router.post('/login',userController.login);

export default router;
