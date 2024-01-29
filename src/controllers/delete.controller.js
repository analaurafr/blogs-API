const jwt = require('jsonwebtoken');
const { postService } = require('../services');

const getUserId = async (authorization) => {
  const token = authorization.split(' ')[1]; const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret); return decoded.data.userId;
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const userId = await getUserId(authorization);
    const post = await postService.getPostById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    if (userId !== post.user.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    await postService.deletePost(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  deletePost,
};
