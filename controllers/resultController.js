import { find } from '../models/Result.js';

const getClassResults = async (req, res) => {
    try {
        const results = await find({ class: req.params.classId });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getStudentResults = async (req, res) => {
    try {
        const results = await find({ student: req.params.studentId });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export default { getClassResults, getStudentResults };