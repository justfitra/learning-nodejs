import { Post } from "../models/postModel.js";

const get = async () => {
  const posts = await Post.find();

  return posts;
};

const create = async (payload) => {
  const post = await Post.create(payload);

  return post;
};

export { get, create };
