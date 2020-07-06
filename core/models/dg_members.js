/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const dgMembers = sequelize.define('dgMembers', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.TEXT,
			allowNull: true,
			primaryKey: true,
			field: 'user_id'
		},
		eventPartyId: {
			type: DataTypes.BIGINT,
			allowNull: true,
			primaryKey: true,
			field: 'event_party_id'
		},
		ptLeader: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'pt_leader'
		}
	}, {
		tableName: 'dg_members'
	});
	return dgMembers
};
