module.exports = (sequelize, DataTypes) => {
  const guilds = sequelize.define('guilds', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      field: 'albion_id'
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'name'
    },
    discordId: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'discord_id'
    },
    prefix: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'discord_id'
    },
    configs: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: 'guild_config'
    }
  }, {
    tableName: 'guilds'
  })
  guilds.associate = function (models) {
    models.guilds.hasMany(models.zvzPlayers)
  }

  return guilds
}
