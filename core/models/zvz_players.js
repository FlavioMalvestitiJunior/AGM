module.exports = (sequelize, DataTypes) => {
    const zvzPlayers = sequelize.define('zvzPlayers', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        zvzTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'zvz_time'
        },
        players: {
            type: DataTypes.JSONB,
            allowNull: false,
            field: 'players'
        },
    }, {
        tableName: 'zvz_players'
    });
    zvzPlayers.associate = function (models) {
        models.zvzPlayers.belongsTo(models.users)
        models.zvzPlayers.belongsTo(models.guilds)
    }

    return zvzPlayers
};
