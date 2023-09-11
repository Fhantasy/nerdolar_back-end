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
  User,
} from "../../models";
import { commentResourceOptions } from "./comment";
import { followResourceOptions } from "./follow";
import { genreResourceOptions } from "./genre";
import { likeResourceOptions } from "./like";
import { mediaGenreResourceOptions } from "./mediaGenre";
import {
  mediaProductResourceOptions,
  mediaProductsResourceFeatures,
} from "./mediaProduct";
import { WatchItem } from "../../models/WatchItem";
import { watchItemResourceOptions } from "./watchItem";
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
    features: mediaProductsResourceFeatures,
  },
  {
    resource: Post,
    options: postResourceOptions,
  },
  {
    resource: WatchItem,
    options: watchItemResourceOptions,
  },
];
