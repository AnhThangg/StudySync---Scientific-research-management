const { raw } = require('body-parser');
const { Topic, Document, Team, StudentTeam, Mentor, Student, sequelize, Faculty } = require('../database/database');
const { Sequelize, where } = require('sequelize');
const { v4: uuid } = require('uuid');


const getTopics = async (req, res) => {
    try {
        const students = await Student.findOne({
            where: {
                accountId: req.account.accountId
            }
        })
        sequelize.query(`select topics.topicCode, topics.topicName, students.studentFullname, mentors.mentorFullname 
        from students 
        inner join student_teams on students.studentCode = student_teams.studentCode
        inner join teams on student_teams.teamCode = teams.teamCode
        inner join topics on teams.teamCode = topics.teamCode 
        inner join mentors on topics.mentorCode = mentors.mentorCode 
        where Students.studentCode = '${students?.studentCode}' `, { type: Sequelize.QueryTypes.SELECT })
            .then(result => {
                return res.status(200).json(result);
            })
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

const createTopic = async (req, res) => {
    try {
        const { body: infoTopic } = req;
        const teamCode = uuid();
        let team;
        let student_team;
        const univerCode = await Faculty.findOne({
            where: {
                facultyCode: infoTopic.facultyCode
            },
            attributes: ['univerCode'],
            raw: true
        });
        const listTopic = await Topic.findAll({
            where: {
                facultyCode: infoTopic.facultyCode
            },
            raw: true
        })


        const topicCode = univerCode.univerCode + infoTopic.facultyCode +
            ((listTopic.length + 1) <= 9 ? ('0' + (listTopic.length + 1)) : listTopic.length + 1);
        // return res.json(topicCode);

        try {
            team = await Team.create({
                teamCode,
                teamName: infoTopic.topicName
            });
            const findLeader = infoTopic.listMember.find(item => item === infoTopic.leader)
            console.log(findLeader);
            if (findLeader) {
                infoTopic.listMember.forEach(async (item) => {
                    student_team = await StudentTeam.create({
                        studentCode: item,
                        teamCode,
                    })
                })
            } else {
                student_team = await StudentTeam.create({
                    studentCode: infoTopic.leader,
                    teamCode,
                })
                infoTopic.listMember.forEach(async (item) => {
                    student_team = await StudentTeam.create({
                        studentCode: item,
                        teamCode,
                    })
                })
            }

            await Topic.create({
                topicCode,
                topicName: infoTopic.topicName,
                topicDescription: infoTopic.topicDescription,
                topicGoalSubject: infoTopic.topicGoalSubject,
                topicExpectedResearch: infoTopic.topicExpectedResearch,
                topicTech: null,
                topicStatus: 'Waiting for Mentor Approval',
                topicDateStart: new Date(infoTopic.topicDateStart),
                topicDateEnd: infoTopic.topicDateEnd,
                facultyCode: infoTopic.facultyCode,
                teamCode,
                mentorCode: infoTopic.mentorCode,
                leader: infoTopic.leader
            });

            return res.status(200).json('Create Project Successfully')
        } catch (e) {
            console.log(e);
            if (team) {
                await team.destroy();
            }
            return res.status(500).json(e);
        }

    } catch (e) {
        return res.status(500).json(e);
    }
}

module.exports = {
    getTopics,
    createTopic
}