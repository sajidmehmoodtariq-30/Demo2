import Question, { find, findById } from '../models/Question.js';

const createQuestion = async (req, res) => {
    const { text, options, correctOption, quiz } = req.body;
    const question = new Question({
        text,
        options,
        correctOption,
        quiz,
    });

    try {
        const createdQuestion = await question.save();
        res.status(201).json(createdQuestion);
    } catch (error) {
        res.status(400).json({ message: 'Invalid question data' });
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await find({});
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const question = await findById(req.params.id);
        if (question) {
            res.json(question);
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const question = await findById(req.params.id);
        if (question) {
            question.text = req.body.text || question.text;
            question.options = req.body.options || question.options;
            question.correctOption = req.body.correctOption || question.correctOption;
            question.quiz = req.body.quiz || question.quiz;

            const updatedQuestion = await question.save();
            res.json(updatedQuestion);
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const question = await findById(req.params.id);
        if (question) {
            await question.remove();
            res.json({ message: 'Question removed' });
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion };