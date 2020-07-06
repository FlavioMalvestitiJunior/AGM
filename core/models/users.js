/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>{
	const users = sequelize.define('users', {
		discordUserId: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
			field: 'discord_user_id'
		},
		userName: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'user_name'
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'password'
		},
		userRole: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'user_role'
		}
	}, {
		tableName: 'users'
	});
	users.associate = function (models) {
		models.users.belongsToMany(models.eventParties, { through: models.dgMembers })
		models.users.hasMany(models.zvzPlayers)
	}

	return users
};
