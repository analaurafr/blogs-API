
const BlogPostModel = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'blog_posts'
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    });

    blogPost.hasMany(models.PostCategory, {
      foreignKey: 'postId',
    })
  }

  return blogPost;
}

module.exports = BlogPostModel;