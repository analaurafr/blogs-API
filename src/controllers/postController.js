const postServices = require('../services/postServices');
const postServices2 = require('../services/postservices2');

const insert = async (req, res) => {
  const authorization = req.header('Authorization');
  const payload = req.body;
  const [, bearer] = authorization.split(' ');
  const { status, data } = await postServices.insert(payload, bearer);
  return res.status(status).json(data);
};

const findAllUser = async (req, res) => {
  const authorization = req.header('Authorization');
  const [, bearer] = authorization.split(' ');
  const { status, data } = await postServices.findAll(bearer);
  return res.status(status).json(data);
};

const findPost = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postServices.findPost(id);
  return res.status(status).json(data);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { status, data } = await postServices.updatePost(id, { title, content });
  return res.status(status).json(data);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postServices2.deletePost({ id });
  return res.status(status).json(data);
};

const search = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await postServices2.search(q);
  return res.status(status).json(data);
};

module.exports = {
  insert,
  findAllUser,
  findPost,
  updatePost,
  deletePost,
  search,
};