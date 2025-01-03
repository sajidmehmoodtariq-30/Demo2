import { Router } from 'express';
import { getClassResults, getStudentResults } from '../controllers/resultController.js';
import { protect, principal, student } from '../middleware/authMiddleware.js';
const router = Router();

router.route('/class/:classId').get(protect, principal, getClassResults);
router.route('/student/:studentId').get(protect, student, getStudentResults);

export default router;