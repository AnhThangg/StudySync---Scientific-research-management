const studentModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'student',
        {
            studentCode: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            studentClass: {
                type: DataTypes.STRING,
                allowNull: false
            },
            studentFullname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            studentSex: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            studentBirthday: {
                type: DataTypes.DATE,
                allowNull: false
            },
            studentEmail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            studentAvatar: {
                type: DataTypes.STRING,
                allowNull: false
            },
            studentAddress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            studentPhone: {
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
    studentModel
}