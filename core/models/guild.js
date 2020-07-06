module.exports = (sequelize, DataTypes) =>{
	const guilds = sequelize.define('guilds', {
		guildId: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
			field: 'guild_id'
		},
		guildName: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'guild_name'
		},
		albionId: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'albion_id'
        },
        guildConfig: {
            type: DataTypes.JSONB,
            allowNull: false,
            field: 'guild_config'
        },
	}, {
		tableName: 'guilds'
	});
	guilds.associate = function (models) {
		models.guilds.hasMany(models.zvzPlayers)
		models.guilds.hasMany(models.users)
	}

	return guilds
};