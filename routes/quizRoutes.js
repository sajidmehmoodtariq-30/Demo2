import { Router } from 'express';
import { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } from '../controllers/quizController.js';
import { protect, principal } from '../middleware/authMiddleware.js';
const router = Router();

router.route('/')
    .post(protect, principal, createQuiz)
    .get(protect, principal, getQuizzes);

router.route('/:id')
    .get(protect, principal, getQuizById)
    .put(protect, principal, updateQuiz)
    .delete(protect, principal, deleteQuiz);

export default router;