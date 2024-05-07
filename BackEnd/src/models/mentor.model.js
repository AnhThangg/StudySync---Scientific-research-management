const mentorModel = (sequelize, DataTypes) =>{
    return sequelize.define(
        'mentor',
        {
            mentorCode: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            mentorFullname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mentorSex: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            mentorBirthday: {
                type: DataTypes.DATE,
                allowNull: false
            },
            mentorPhone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mentorEmail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mentorDegree: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mentorScientificName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mentorAvatar: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mentorAddress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            facultyCode: {
                type: DataTypes.STRING,
                allowNull: false
            },
            accountId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        }
    )
}
module.exports = {
    mentorModel
}