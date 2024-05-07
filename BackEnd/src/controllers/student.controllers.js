const { ProposeIdea, Topic, Document, Team, StudentTeam, Mentor, Student, sequelize, Faculty } = require('../database/database');
const { Sequelize, where } = require('sequelize');
const { v4: uuid } = require('uuid');

const fortmartDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
}



const getStudent = async (req, res) => {
    try {
        const { id: studentCode } = req.params;
        const student = await Student.findOne({
            where: {
                studentCode,
            },
            raw: true
        })
        if (!student) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Student Does not Exist!'
            })
        }
        const faculty = await Faculty.findOne({
            where: {
                facultyCode: student.facultyCode
            }
        });
        student.facultyName = faculty.facultyName;
        const { studentEmail, studentBirthday, studentAddress, studentPhone, accountId, facultyCode, ...data } = student;
        return res.status(200).send({
            status: 'success',
            student: data
        });

    } catch (e) {
        return res.status(500).json(e);
    }



}

const getTopicApprovedForStudent = async (req, res) => {
    try {
        const students = await Student.findOne({
            where: {
                accountId: req.account.accountId
            }
        })
        await sequelize.query(`with result as (
            select topics.topicCode, topics.topicName, topics.leader, mentors.mentorFullname 
            from students 
            inner join student_teams on students.studentCode = student_teams.studentCode
            inner join teams on student_teams.teamCode = teams.teamCode
            inner join topics on teams.teamCode = topics.teamCode 
            inner join mentors on topics.mentorCode = mentors.mentorCode 
            where students.studentCode = '${students?.studentCode}' and topics.topicStatus = 'Approved')
            select result.topicCode, result.topicName, result.mentorFullname, students.studentFullname from result
            inner join students on students.studentCode = result.leader; `, { type: Sequelize.QueryTypes.SELECT })
            .then(result => {
                const simplifiedTopics = result.map((item, index) => ({
                    no: index + 1,
                    ...item
                }));
                return res.status(200).json(simplifiedTopics);
            })
    } catch (e) {
        console.log(e)
        return res.status(500).json(e.error);
    }
}

const getTopicApprovedDetailForStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const topic = await Topic.findOne({
            where: {
                topicCode: id
            },
            raw: true
        })
        if (!topic) {
            return res.status(404).json('Topic Not Found');
        }
        const mentor = await Mentor.findOne({
            where: {
                mentorCode: topic.mentorCode
            },
            attributes: ['mentorScientificName', 'mentorEmail', 'mentorPhone'],
            raw: true
        })
        const leader = await Student.findOne({
            where: {
                studentCode: topic.leader
            },
            attributes: ['studentCode', 'studentFullname', 'studentEmail', 'studentPhone'],
            raw: true
        })
        const listMember = await StudentTeam.findAll({
            where: {
                teamCode: topic.teamCode,
                studentCode: {
                    [Sequelize.Op.ne]: topic.leader
                }
            }
        })
        const studentCodes = listMember.map(member => member.studentCode);
        const members = await Student.findAll({
            where: {
                studentCode: studentCodes
            },
            attributes: ['studentCode', 'studentFullname'],
            raw: true
        });
        const topicDate = '(' + fortmartDate(topic.topicDateStart) + ') - (' + fortmartDate(topic.topicDateEnd) + ')';

        const faculty = await Faculty.findOne({
            where: {
                facultyCode: topic.facultyCode
            },
            attributes: ['facultyName']
        })
        facultyName =faculty.facultyName;

        const result = {
            mentor: {
                ...mentor
            },
            leader,
            groupMembers: [
                ...members
            ],
            topicDate,
            facultyName,
            topic: {
                ...topic
            },
        }

        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        return res.status(500).json(e.error);
    }
}

module.exports = {
    getStudent,
    getTopicApprovedForStudent,
    getTopicApprovedDetailForStudent
}