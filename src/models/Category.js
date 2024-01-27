const CategoryModel = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    tableName: 'categories',
  });

  category.associate = (models) => {
    category.hasMany(models.PostCategory, {
      foreignKey: 'categoryId'
    });
  }

  return category;
}

module.exports = CategoryModel