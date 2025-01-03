import { Router } from 'express';
import { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } from '../controllers/questionController.js';
import { protect, principal } from '../middleware/authMiddleware.js';
const router = Router();

router.route('/')
    .post(protect, principal, createQuestion)
    .get(protect, principal, getQuestions);

router.route('/:id')
    .get(protect, principal, getQuestionById)
    .put(protect, principal, updateQuestion)
    .delete(protect, principal, deleteQuestion);

export default router;