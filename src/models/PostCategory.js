const PostCategoryModel = (sequelize, Datatypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      field: 'post_id',
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlogPost',
        key: 'id'
      }
    },
    categoryId: {
      field: 'category_id',
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories'
  });

  postCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      through: postCategory,
      otherKey: 'postId'
    });

    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      through: postCategory,
      otherKey: 'categoryId', as: 'categories'
    });
  }

  return postCategory;
}

module.exports = PostCategoryModel;