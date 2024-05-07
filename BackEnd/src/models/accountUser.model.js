const accountUserModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'accountUser',
        {
            accountId: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    )
}
module.exports = {
    accountUserModel
}