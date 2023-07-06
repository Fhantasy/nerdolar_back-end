import { User, UserCreationsAttributes } from "../models/User";

export const userService = {
  create: async (params: UserCreationsAttributes) => {
    const user = await User.create(params);
    return user;
  },
};
