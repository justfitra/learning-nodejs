import { Post } from "../models/postModel.js";

const get = async () => {
  const posts = await Post.find();

  return posts;
};

const create = async (payload) => {
  const post = await Post.create(payload);

  return post;
};

const update = async (payload, title) => {
  const post = await Post.updateOne(
    { title: title },
    { ...payload },
    {
      new: true,
      runValidators: true,
    },
  );

  return post;
};

const show = async (title) => {
  const post = await Post.find({ title: title });

  return post;
};

const del = async (title) => {
  const post = await Post.deleteOne({ title: title });

  return post;
};
export { get, show, create, update, del };
