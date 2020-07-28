/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const eventParties = sequelize.define('eventParties', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    discordServer: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'discord_server'
    },
    scheduleTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'schedule_time'
    },
    event: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'event'
    },
    departurePlacement: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'departure_placement'
    }
  }, {
    tableName: 'event_parties'
  })
  eventParties.associate = function (models) {
    models.eventParties.belongsToMany(models.users, { through: models.dgMembers })
  }
  return eventParties
}
