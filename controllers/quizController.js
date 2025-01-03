import Quiz, { find, findById } from '../models/Quiz.js';

const createQuiz = async (req, res) => {
    const { title, class: className, section, subject, type, questions } = req.body;
    const quiz = new Quiz({
        title,
        class: className,
        section,
        subject,
        type,
        questions,
        createdBy: req.user._id,
    });

    try {
        const createdQuiz = await quiz.save();
        res.status(201).json(createdQuiz);
    } catch (error) {
        res.status(400).json({ message: 'Invalid quiz data' });
    }
};

const getQuizzes = async (req, res) => {
    try {
        const quizzes = await find({});
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getQuizById = async (req, res) => {
    try {
        const quiz = await findById(req.params.id);
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateQuiz = async (req, res) => {
    try {
        const quiz = await findById(req.params.id);
        if (quiz) {
            quiz.title = req.body.title || quiz.title;
            quiz.class = req.body.class || quiz.class;
            quiz.section = req.body.section || quiz.section;
            quiz.subject = req.body.subject || quiz.subject;
            quiz.type = req.body.type || quiz.type;
            quiz.questions = req.body.questions || quiz.questions;

            const updatedQuiz = await quiz.save();
            res.json(updatedQuiz);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteQuiz = async (req, res) => {
    try {
        const quiz = await findById(req.params.id);
        if (quiz) {
            await quiz.remove();
            res.json({ message: 'Quiz removed' });
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz };