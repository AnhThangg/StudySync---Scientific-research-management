const teamModel = (sequelize, DataTypes) =>{
    return sequelize.define(
        'team',
        {
            teamCode :{
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            teamName :{
                type: DataTypes.STRING,
                allowNull: false
            },
        }
    )
}
module.exports = {
    teamModel
}