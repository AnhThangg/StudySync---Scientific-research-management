const topicModel = (sequelize, DataTypes) =>{
    return sequelize.define(
        'topic',
        {
            topicCode: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            topicName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            topicDescription: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            topicGoalSubject: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            topicExpectedResearch: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            topicTech: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            topicStatus: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            topicDateStart: {
                type: DataTypes.DATE,
                allowNull: false
            },
            topicDateEnd: {
                type: DataTypes.DATE,
                allowNull: false
            },
            facultyCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            teamCode: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            mentorCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            leader: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    )
}
module.exports = {
    topicModel
}