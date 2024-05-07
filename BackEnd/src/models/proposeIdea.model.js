const proposeIdeaModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'proposeIdea',
        {
            ideaCode: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            ideaName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            ideaDescription: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            ideaGoalSubject: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            ideaExpectedResearch: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            otherNotes: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            mentorCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            
        }
    )
}
module.exports = {
    proposeIdeaModel
}