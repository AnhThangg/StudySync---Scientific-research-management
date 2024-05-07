const student_teamModel = (sequelize, DataTypes) =>{
    return sequelize.define(
        'student_team',
        {
            studentCode: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            teamCode: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            }
        }
    )
}
module.exports = {
    student_teamModel
}