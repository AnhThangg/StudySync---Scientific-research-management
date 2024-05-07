const documentModel = (sequelize, DataTypes) =>{
    return sequelize.define(
        'document',
        {
            documentCode:{
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            documentName:{
                type: DataTypes.STRING,
                allowNull: false
            },
            documentNameSourceCode:{
                type: DataTypes.STRING,
                allowNull: false
            },
            topicCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }
    )
}
// 
module.exports = {
    documentModel
}