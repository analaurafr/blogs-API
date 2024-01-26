const UserModel = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'display_name'
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      foreignKey: 'userId'
    });
  }

  return user;
}

module.exports = UserModel