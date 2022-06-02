import { Router } from 'express';
import userRoutes from './../src/router/users';
import userFileRoutes from './../src/router/userFile';


/**
 * Contains all API routes for the application.
 */
const router = Router();

router.use('/users', userRoutes);
router.use('/files', userFileRoutes);

export default router;
