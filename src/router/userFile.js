import { Router } from 'express';
import * as userFileController from '../controller/userFile';
const router = Router();
import multer  from  'multer';
import verifyToken from '../middleware/verifyToken';

const upload = multer({ dest: 'uploads/' });

/**
 * POST /api/v1/files/add
 */
router.post('/add',upload.single('file'),verifyToken,userFileController.add);
router.get('/view',verifyToken, userFileController.view);
router.get('/delete',verifyToken, userFileController.deleteFile);

export default router;
