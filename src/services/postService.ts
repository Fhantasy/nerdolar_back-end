import { Sequelize } from "sequelize";
import { Category, Comment, Like, MediaProduct, User } from "../models";
import { Post, PostCreationsAttributes, PostInstance } from "../models/Post";
import { followService } from "./followService";
import { Op } from "sequelize";

export const postService = {
  create: async (
    params: PostCreationsAttributes,
    images?: Express.Multer.File[]
  ) => {
    if (!images) {
      const post = await Post.create(params);
      return post;
    } else {
      const imageUrls = images.map((image) => {
        return image.path;
      });

      const post = await Post.create({ ...params, imageUrls });
      return post;
    }
  },

  getOne: async (id: number, userId: number) => {
    const post = await Post.findByPk(id, {
      attributes: [
        "id",
        "message",
        ["image_urls", "imageUrls"],
        ["created_at", "createdAt"],
        [Sequelize.fn("COUNT", Sequelize.col("Likes.id")), "likes"],
      ],
      include: [
        {
          model: Like,
          attributes: [],
        },
        {
          model: User,
          as: "liked",
          attributes: ["nickname"],
          through: { attributes: [] },
          where: { id: userId },
          required: false,
        },
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
        "User.id",
        "liked.id",
        "liked->Like.id",
        "MediaProduct.id",
        "MediaProduct->category.id",
        "comments.id",
        "comments->user.id",
      ],
    });

    return post;
  },

  getAllFromUser: async (
    userId: number,
    currentUserId: number,
    page: number,
    perPage: number
  ) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Post.findAndCountAll({
      where: {
        userId,
      },
      attributes: [
        "id",
        "message",
        ["image_urls", "imageUrls"],
        ["created_at", "createdAt"],
        [Sequelize.fn("COUNT", Sequelize.col("Likes.id")), "likes"],
      ],
      include: [
        {
          model: Like,
          attributes: [],
        },
        {
          model: User,
          as: "liked",
          attributes: ["nickname"],
          through: { attributes: [] },
          where: { id: currentUserId },
          required: false,
        },
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
      order: [["created_at", "DESC"]],
      distinct: true,
      subQuery: false,
      group: [
        "Post.id",
        "liked.id",
        "liked->Like.id",
        "User.id",
        "MediaProduct.id",
        "MediaProduct->category.id",
      ],
    });

    return {
      posts: rows,
      page,
      perPage,
      total: count.length,
    };
  },

  getAllFromMedia: async (
    userId: number,
    mediaProductId: number,
    page: number,
    perPage: number
  ) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Post.findAndCountAll({
      where: {
        mediaProductId,
      },
      attributes: [
        "id",
        "message",
        ["image_urls", "imageUrls"],
        ["created_at", "createdAt"],
        [Sequelize.fn("COUNT", Sequelize.col("Likes.id")), "likes"],
      ],
      include: [
        {
          model: Like,
          attributes: [],
        },
        {
          model: User,
          as: "liked",
          attributes: ["nickname"],
          through: { attributes: [] },
          where: { id: userId },
          required: false,
        },
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
      order: [["created_at", "DESC"]],
      distinct: true,
      subQuery: false,
      group: [
        "Post.id",
        "liked.id",
        "liked->Like.id",
        "User.id",
        "MediaProduct.id",
        "MediaProduct->category.id",
      ],
    });

    return {
      posts: rows,
      page,
      perPage,
      total: count.length,
    };
  },

  feed: async (userId: number, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const followingUsers = await followService.getFollowings(userId, 1, 999999);

    let postsPromises = followingUsers.followings.map(async (followingUser) => {
      const posts = await postService.getAllFromUser(
        followingUser.follow!.id!,
        userId,
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
    posts.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());

    const postsPaginated = posts.splice(offset, perPage);

    return postsPaginated;
  },

  findByMessage: async (
    term: string,
    currentUserId: number,
    page: number,
    perPage: number
  ) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Post.findAndCountAll({
      where: {
        message: {
          [Op.iLike]: `%${term}%`,
        },
      },
      attributes: [
        "id",
        "message",
        ["image_urls", "imageUrls"],
        ["created_at", "createdAt"],
        [Sequelize.fn("COUNT", Sequelize.col("Likes.id")), "likes"],
      ],
      include: [
        {
          model: Like,
          attributes: [],
        },
        {
          model: User,
          as: "liked",
          attributes: ["nickname"],
          through: { attributes: [] },
          where: { id: currentUserId },
          required: false,
        },
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
      order: [["created_at", "DESC"]],
      distinct: true,
      subQuery: false,
      group: [
        "Post.id",
        "liked.id",
        "liked->Like.id",
        "User.id",
        "MediaProduct.id",
        "MediaProduct->category.id",
      ],
    });

    return {
      posts: rows,
      page,
      perPage,
      total: count.length,
    };
  },

  delete: async (id: number) => {
    await Post.destroy({ where: { id } });
  },
};
