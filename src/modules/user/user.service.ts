//#region-imports
import userRepository from "./user.repository";
import { UserResponse, UserRow } from "./user.types";
//#endregion

export default {
  async findAll(): Promise<UserRow[]> {
    const data = await userRepository.findAll();

    return data;
  },
};
