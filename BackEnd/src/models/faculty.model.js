const facultyModel = (sequelize, DataTypes) =>{
    return sequelize.define(
        'faculty',
        {
            facultyCode:{
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            facultyName:{
                type: DataTypes.STRING,
                allowNull: false
            },
            facultyPhone:{
                type: DataTypes.STRING,
                allowNull: false
            },
            facultyEmail:{
                type: DataTypes.STRING,
                allowNull: false
            },
            facultyAddress:{
                type: DataTypes.STRING,
                allowNull: false
            },
            facultyAvatar:{
                type: DataTypes.STRING,
                allowNull: false
            },
            univerCode:{
                type: DataTypes.STRING,
                allowNull: false
            },
            accountId:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }
    )
}
module.exports = {
    facultyModel
}