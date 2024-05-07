const schedule = require('node-schedule')
const { ProposeIdea, Topic, Document, Team, StudentTeam, Mentor, Student, sequelize, Faculty } = require('../database/database');


const status = schedule.scheduleJob(' * * * * *', async () => {
    try {
        const topics = await Topic.findAll({
            where: {
                topicStatus: 'Approved'
            }
        });

        topics.forEach(async (item) => {
            if (item.topicDateStart.getTime() <= new Date().getTime()) {
                item.topicStatus = 'In progess';
                await item.save();
            }
            if (item.topicDateEnd.getTime() <= new Date().getTime()) {
                item.topicStatus = 'Finish';
                await item.save();
            }
        });
    } catch (e) {
        console.log(e);
    }
});


module.exports = { status }