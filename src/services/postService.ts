import { Op, Sequelize } from "sequelize";
import {
  Category,
  Comment,
  Like,
  MediaProduct,
  PostImage,
  User,
} from "../models";
import { Post, PostCreationsAttributes, PostInstance } from "../models/Post";
import { followService } from "./followService";
import { FollowInstance } from "../models/Follow";
import sequelize from "sequelize";

export const postService = {
  create: async (params: PostCreationsAttributes, urlImgs?: string[]) => {
    const post = await Post.create(params);

    if (!urlImgs) return;

    urlImgs.forEach(async (imgUrl) => {
      await PostImage.create({
        imgUrl,
        postId: post.id,
      });
    });
  },

  getOne: async (id: number) => {
    const post = await Post.findByPk(id, {
      attributes: [
        "id",
        "message",
        ["created_at", "createdAt"],
        [Sequelize.fn("count", Sequelize.col(`Likes.id`)), "likes"],
      ],
      include: [
        { model: PostImage, attributes: ["id", "imgUrl"] },
        { model: Like, attributes: [] },
        {
          model: User,
          attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
        },
        {
          model: MediaProduct,
          attributes: [
            "id",
            "title",
            ["thumbnail_img", "thumbnailImg"],
            ["category_id", "categoryId"],
          ],
          include: [{ model: Category, as: "category", attributes: ["name"] }],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "message", ["created_at", "createdAt"]],
          include: [
            {
              model: User,
              as: "user",
              attributes: [
                "id",
                "nickname",
                "name",
                ["profile_img", "profileImg"],
              ],
            },
          ],
        },
      ],
      group: [
        "Post.id",
        "PostImages.id",
        "User.id",
        "MediaProduct.id",
        "MediaProduct->category.id",
        "comments.id",
        "comments->user.id",
      ],
    });

    return post;
  },

  getAllFromUser: async (userId: number, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Post.findAndCountAll({
      where: {
        userId,
      },
      attributes: ["id", "message", ["created_at", "createdAt"]],
      include: [
        { model: PostImage, attributes: ["id", "imgUrl"] },
        {
          model: User,
          attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
        },
        {
          model: MediaProduct,
          attributes: [
            "id",
            "title",
            ["thumbnail_img", "thumbnailImg"],
            ["category_id", "categoryId"],
          ],
          include: [{ model: Category, as: "category", attributes: ["name"] }],
        },
      ],
      limit: perPage,
      offset,
      distinct: true,
    });

    return {
      posts: rows,
      page,
      perPage,
      total: count,
    };
  },

  search: async (term: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Post.findAndCountAll({
      where: {
        message: {
          [Op.iLike]: `%${term}%`,
        },
      },
      attributes: ["id", "message", ["created_at", "createdAt"]],
      include: [
        { model: PostImage, attributes: ["id", "imgUrl"] },
        {
          model: User,
          attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
        },
        {
          model: MediaProduct,
          attributes: [
            "id",
            "title",
            ["thumbnail_img", "thumbnailImg"],
            ["category_id", "categoryId"],
          ],
          include: [{ model: Category, as: "category", attributes: ["name"] }],
        },
      ],
      limit: perPage,
      offset,
      distinct: true,
    });

    return {
      posts: rows,
      page,
      perPage,
      total: count,
    };
  },

  feed: async (userId: number) => {
    const followingUsers = await followService.getFollowings(userId, 1, 999999);
    let postsPromises = followingUsers.folowings.map(async (followingUser) => {
      const posts = await postService.getAllFromUser(
        followingUser.follow!.id!,
        1,
        5
      );
      return [...posts.posts];
    });

    const postsFromAllFollowings = await Promise.all(postsPromises);

    let posts: PostInstance[] = [];

    postsFromAllFollowings.forEach((postsGroup) => {
      posts = [...posts, ...postsGroup];
    });
    posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return posts;
  },

  delete: async (id: number) => {
    await Post.destroy({ where: { id } });
  },
};
