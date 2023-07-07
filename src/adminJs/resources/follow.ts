import { ResourceOptions } from "adminjs";

export const followResourceOptions: ResourceOptions = {
  navigation: "Administração",
  editProperties: ["userFollowingId", "userFollowedId"],
  filterProperties: [
    "userFollowingId",
    "userFollowedId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["userFollowingId", "userFollowedId"],
  showProperties: [
    "id",
    "userFollowingId",
    "userFollowedId",
    "createdAt",
    "updatedAt",
  ],
};
