const { AccountUser, Univer, Faculty, Mentor, Student, sequelize } = require('../database/database');

const getAllUniverCode = async (req, res) => {
    try {
        const universities = await Univer.findAll({
            attributes: ['univerCode', 'univerName']
        });
        return res.status(200).json(universities);
    } catch (e) {
        return res.status(500).json(e);
    }
}

const getDashboardForUniver = async (req, res) => {
    const { id } = req.params;

    try {
        const univer = await Univer.findOne({
            where: { univerCode: id },
            include: [{
                model: Faculty,
                include: [{
                    model: Student
                }]
            }]
        });
        if (!univer) {
            return res.status(404).json('Univer not found');
        }

        // Tạo một mảng chứa thông tin về từng khoa và số lượng sinh viên của từng khoa
        const facultyData = univer.faculties.map(faculty => ({
            facultyName: faculty.facultyName,
            studentCount: faculty.students.length
        }));

        return res.status(200).json({
            univerName: univer.univerName,
            facultyData: facultyData
        });
    } catch (e) {
        return res.status(500).json(e);
    }
}



module.exports = {
    getAllUniverCode,
    getDashboardForUniver
}