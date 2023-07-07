import { ResourceWithOptions } from "adminjs";
import { categoryResourceOptions } from "./category";
import { userResourceFeatures, userResourceOptions } from "./user";
import {
  Category,
  Comment,
  Follow,
  Genre,
  Like,
  MediaGenre,
  MediaProduct,
  Post,
  PostImage,
  User,
} from "../../models";
import { commentResourceOptions } from "./comment";
import { followResourceOptions } from "./follow";
import { genreResourceOptions } from "./genre";
import { likeResourceOptions } from "./like";
import { mediaGenreResourceOptions } from "./mediaGenre";
import { mediaProductResourceOptions } from "./mediaProduct";
import { postImageResourceOptions } from "./postImage";
import { WatchIten } from "../../models/WatchIten";
import { watchItenResourceOptions } from "./watchIten";
import { postResourceOptions } from "./post";

export const adminJSResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourceOptions,
  },
  {
    resource: User,
    options: userResourceOptions,
    features: userResourceFeatures,
  },
  {
    resource: Comment,
    options: commentResourceOptions,
  },
  {
    resource: Follow,
    options: followResourceOptions,
  },
  {
    resource: Genre,
    options: genreResourceOptions,
  },
  {
    resource: Like,
    options: likeResourceOptions,
  },
  {
    resource: MediaGenre,
    options: mediaGenreResourceOptions,
  },
  {
    resource: MediaProduct,
    options: mediaProductResourceOptions,
  },
  {
    resource: Post,
    options: postResourceOptions,
  },
  {
    resource: PostImage,
    options: postImageResourceOptions,
  },
  {
    resource: WatchIten,
    options: watchItenResourceOptions,
  },
];
