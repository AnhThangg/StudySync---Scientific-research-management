const univerModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'univer',
        {
            univerCode: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            univerName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            univerPhone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            univerEmail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            univerAvatar: {
                type: DataTypes.STRING,
                allowNull: false
            },
            univerAddress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            accountId: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }
    )
}

module.exports = {
    univerModel
}