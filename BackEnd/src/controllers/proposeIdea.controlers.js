const { where } = require('sequelize');
const { Mentor, Student, Faculty, Topic, ProposeIdea, AccountUser } = require('../database/database');
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

const createProposeIdea = async (req, res) => {
    try {
        const { body: info } = req;
        const account = req.account;

        // Kiểm tra xem có bản ghi nào tồn tại với ideaName đã được cung cấp hay không
        const existingIdea = await ProposeIdea.findOne({
            where: {
                ideaName: info.ideaName
            }
        });

        // Nếu đã tồn tại bản ghi với ideaName đã được cung cấp, trả về lỗi
        if (existingIdea) {
            return res.status(400).json('Idea Name already exists');
        }

        const mentor = await Mentor.findOne({
            where: {
                accountId: account.accountId
            }
        });

        await ProposeIdea.create({
            ideaCode: uuid(),
            ideaName: info.ideaName,
            ideaDescription: info.ideaDescription,
            ideaGoalSubject: info.ideaGoalSubject,
            ideaExpectedResearch: info.ideaExpectedResearch,
            otherNotes: info.otherNotes,
            mentorCode: mentor.mentorCode
        });
        return res.status(200).json('Create Propose Idea Successfully')
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

const getListProposeIdea = async (req, res) => {
    try {
        const account = req.account;
        let facultyCode;
        switch (account.role) {
            case "univer": { }
            case "faculty": {
                const faculty = await Faculty.findOne({
                    where: {
                        accountId: account.accountId
                    }
                })
                facultyCode = faculty.facultyCode;
                break;
            }
            case "mentor": {
                const mentor = await Mentor.findOne({
                    where: {
                        accountId: account.accountId
                    }
                });
                facultyCode = mentor.facultyCode;
                break;
            }
            case "student": {
                const student = await Student.findOne({
                    where: {
                        accountId: account.accountId
                    }
                });
                facultyCode = student.facultyCode;
                break;
            }
        }
        const listProposeIdea = await ProposeIdea.findAll({
            attributes: ['ideaCode', 'ideaName', 'createdAt', 'updatedAt'],
            include: [{
                model: Mentor,
                attributes: ['mentorFullname', 'facultyCode', 'createdAt', 'updatedAt'],
                where: {
                    facultyCode
                }
            }]
        });
        const faculty = await Faculty.findOne({
            where: {
                facultyCode
            }
        })
        const result = listProposeIdea.map(idea => ({
            ideaCode: idea.ideaCode,
            ideaName: idea.ideaName,
            mentorFullname: idea.mentor.mentorFullname,
            facultyCode: idea.mentor.facultyCode,
            facultyName: faculty.facultyName,
            createdAt: fortmartDate(idea.createdAt),
            updatedAt: fortmartDate(idea.updatedAt)
        }));
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

const getProposeIdea = async (req, res) => {
    try {
        const { id: ideaCode } = req.params;
        const proposeIdea = await ProposeIdea.findOne({
            where: {
                ideaCode
            }
        })
        return res.status(200).json(proposeIdea);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

const deleteProposeIdea = async (req, res) => {
    try {
        const { id: ideaCode } = req.params;
        const proposeIdea = await ProposeIdea.findOne({
            where: {
                ideaCode
            }
        });
        if (!proposeIdea) {
            return res.status(404).json('Propose Idea Not Found');
        }
        await ProposeIdea.destroy({
            where: {
                ideaCode
            }
        });
        return res.status(200).json('Propose Idea deleted successfully');
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

const getMyProposeIdea = async (req, res) => {
    try {
        const account = req.account;
        const mentor = await Mentor.findOne({
            where: {
                accountId: account.accountId
            }
        });
        const listProposeIdea = await ProposeIdea.findAll({
            where: {
                mentorCode: mentor.mentorCode
            }
        })
        const updatedListProposeIdea = listProposeIdea.map(idea => ({
            ideaCode: idea.ideaCode,
            ideaName: idea.ideaName,
            ideaDescription: idea.ideaDescription,
            ideaGoalSubject: idea.ideaGoalSubject,
            ideaExpectedResearch: idea.ideaExpectedResearch,
            otherNotes: idea.otherNotes,
            mentorCode: idea.mentorCode,
            createdAt: fortmartDate(idea.createdAt),
            updatedAt: fortmartDate(idea.updatedAt)
        }));
        return res.status(200).json(updatedListProposeIdea);
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

const updateProposalIdea = async (req, res) => {
    try {
        const { id: ideaCode } = req.params;
        const { body: info } = req;
        const account = req.account;
        const mentor = await Mentor.findOne({
            where: {
                accountId: account.accountId
            }
        });
        const proposeIdea = await ProposeIdea.findOne({
            where: {
                ideaCode
            }
        });
        if (!proposeIdea) {
            return res.status(404).json('Propose Idea Not Found');
        }
        if (mentor.mentorCode !== proposeIdea.mentorCode) {
            return res.status(403).json(`Do not edit other people's proposalsIdea`);
        }
        await proposeIdea.update({
            ideaName: info.ideaName,
            ideaDescription: info.ideaDescription,
            ideaGoalSubject: info.ideaGoalSubject,
            ideaExpectedResearch: info.ideaExpectedResearch,
            otherNotes: info.otherNotes,
        })
        return res.status(200).json('Propose Idea updated successfully');
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
}

module.exports = {
    createProposeIdea,
    getListProposeIdea,
    getProposeIdea,
    deleteProposeIdea,
    getMyProposeIdea,
    updateProposalIdea
}