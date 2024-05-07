const { Model } = require('sequelize');
const { Mentor, Student, Faculty, Topic, ProposeIdea, AccountUser, StudentTeam } = require('../database/database');
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

const getMentor = async (req, res) => {
    try {
        const { id: idMentor } = req.params;
        const mentor = await Mentor.findOne({
            where: {
                mentorCode: idMentor,
            },
            raw: true
        })
        if (!mentor) {
            return res.status(404).json('Mentor does not exist')
        }
        const faculty = await Faculty.findOne({
            where: {
                facultyCode: mentor.facultyCode
            }
        });
        mentor.facultyName = faculty.facultyName;
        const { mentorCode, mentorAvatar, accountId, facultyCode, ...data } = mentor;
        return res.status(200).send(data);

    } catch (e) {
        return res.status(500).json(e);
    }
}

const getUnconfirmedTopicsForMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findOne({
            where: {
                accountId: req.account.accountId
            }
        })
        const topics = await Topic.findAll({
            where: {
                mentorCode: mentor.mentorCode,
                topicStatus: 'Waiting for Mentor Approval'
            },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['studentFullname']
                }
            ],
            attributes: ['topicCode', 'topicName', 'createdAt']
        });
        const simplifiedTopics = topics.map((topic, index) => ({
            no: index + 1,
            topicCode: topic.topicCode,
            topicName: topic.topicName,
            leader: topic.student.studentFullname,
            dateCreate: fortmartDate(topic.createdAt)
        }));

        return res.status(200).json(simplifiedTopics);
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

const getUnconfirmedTopicDetailForMentor = async (req, res) => {
    try {
        const { id: topicId } = req.params;
        const mentor = await Mentor.findOne({
            where: {
                accountId: req.account.accountId
            }
        })
        const topic = await Topic.findOne({
            where: {
                mentorCode: mentor.mentorCode,
                topicStatus: 'Waiting for Mentor Approval',
                topicCode: topicId
            },
            include: [
                {
                    model: Student,
                    as: 'student',
                },
            ],
        });
        const studentCodes = await StudentTeam.findAll({
            where: {
                teamCode: topic.teamCode // Sử dụng teamCode của mentor
            },
            attributes: ['studentCode'] // Chỉ lấy trường studentCode
        });
        const studentCodeList = studentCodes.map(student => student.studentCode);
        const members = await Student.findAll({
            where: {
                studentCode: studentCodeList
            },
            attributes: ['studentCode', 'studentFullname', 'studentPhone', 'studentEmail']
        });
        const filteredMembers = members.filter(member => member.studentCode !== topic.leader);
        const filteredMembersArray = filteredMembers.map(member => ({
            studentCode: member.studentCode,
            studentFullname: member.studentFullname,
            studentPhone: member.studentPhone,
            studentEmail: member.studentEmail
        }));
        const facultyName = await Faculty.findOne({
            where: {
                facultyCode: topic.facultyCode
            },
            attributes: ['facultyName']
        });

        const result = {
            facultyName: facultyName.facultyName,
            topicCode: topic.topicCode,
            topicName: topic.topicName,
            topicDescription: topic.topicDescription,
            topicGoalSubject: topic.topicGoalSubject,
            topicExpectedResearch: topic.topicExpectedResearch,
            topicDateStart: fortmartDate(topic.topicDateStart),
            topicDateEnd: fortmartDate(topic.topicDateEnd),
            leaderID: topic.leader,
            leaderName: topic.student.studentFullname,
            leaderEmail: topic.student.studentEmail,
            leaderPhone: topic.student.studentPhone,
            members: filteredMembersArray
        };
        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

const approveTopicForMentor = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await Topic.findOne({
            where: {
                topicCode: id,
                topicStatus: 'Waiting for Mentor Approval'
            }
        });
        if (!topic) {
            return res.status(404).json('Topic not Found');
        }
        await Topic.update(
            { topicStatus: 'Waiting for Faculty Approval' },
            { where: { topicCode: id } }
        );
        return res.status(200).json('Topic approval was successful, awaiting Faculty approval')
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}


const getConfirmedTopicsForMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findOne({
            where: {
                accountId: req.account.accountId
            }
        })
        const topics = await Topic.findAll({
            where: {
                mentorCode: mentor.mentorCode,
                topicStatus: { [Sequelize.Op.or]: ['Approved', 'In progess'] } // Sử dụng toán tử OR
            },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['studentFullname']
                }
            ],
            attributes: ['topicCode', 'topicName', 'createdAt']
        });
        const simplifiedTopics = topics.map((topic, index) => ({
            no: index + 1,
            topicCode: topic.topicCode,
            topicName: topic.topicName,
            leader: topic.student.studentFullname,
            dateCreate: fortmartDate(topic.createdAt)
        }));
        return res.status(200).json(simplifiedTopics);
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

const getConfirmedTopicDetailForMentor = async (req, res) => {
    try {
        const { id: topicId } = req.params;
        const mentor = await Mentor.findOne({
            where: {
                accountId: req.account.accountId
            }
        })
        const topic = await Topic.findOne({
            where: {
                mentorCode: mentor.mentorCode,
                topicStatus: { [Sequelize.Op.or]: ['Approved', 'In progess'] },
                topicCode: topicId
            },
            include: [
                {
                    model: Student,
                    as: 'student',
                },
            ],
        });
        const studentCodes = await StudentTeam.findAll({
            where: {
                teamCode: topic.teamCode // Sử dụng teamCode của mentor
            },
            attributes: ['studentCode'] // Chỉ lấy trường studentCode
        });
        const studentCodeList = studentCodes.map(student => student.studentCode);
        const members = await Student.findAll({
            where: {
                studentCode: studentCodeList
            },
            attributes: ['studentCode', 'studentFullname', 'studentPhone', 'studentEmail']
        });
        const filteredMembers = members.filter(member => member.studentCode !== topic.leader);
        const filteredMembersArray = filteredMembers.map(member => ({
            studentCode: member.studentCode,
            studentFullname: member.studentFullname,
            studentPhone: member.studentPhone,
            studentEmail: member.studentEmail
        }));
        const facultyName = await Faculty.findOne({
            where: {
                facultyCode: topic.facultyCode
            },
            attributes: ['facultyName']
        });

        const result = {
            facultyName: facultyName.facultyName,
            topicCode: topic.topicCode,
            topicName: topic.topicName,
            topicDescription: topic.topicDescription,
            topicTech: topic.topicTech,
            topicGoalSubject: topic.topicGoalSubject,
            topicExpectedResearch: topic.topicExpectedResearch,
            topicDateStart: fortmartDate(topic.topicDateStart),
            topicDateEnd: fortmartDate(topic.topicDateEnd),
            leaderID: topic.leader,
            leaderName: topic.student.studentFullname,
            leaderEmail: topic.student.studentEmail,
            leaderPhone: topic.student.studentPhone,
            members: filteredMembersArray
        };
        return res.status(200).json(result);
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

module.exports = {
    getMentor,
    getUnconfirmedTopicsForMentor,
    getUnconfirmedTopicDetailForMentor,
    approveTopicForMentor,
    getConfirmedTopicsForMentor,
    getConfirmedTopicDetailForMentor,
}