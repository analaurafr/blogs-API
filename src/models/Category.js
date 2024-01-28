module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', { id: { type: DataTypes.INTEGER, primaryKey: true}, }, { timestamps: false});

  return Category;
};