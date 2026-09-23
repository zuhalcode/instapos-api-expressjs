//#region-imports

import userRepository from "./user.repository";
import { CreateAuthUserDTO, UpdateUserDTO } from "./user.schema";
import { CreateAuthUserPayload, UserResponse, UserRow } from "./user.types";
//#endregion

export default {
  async findAll(): Promise<UserRow[]> {
    return await userRepository.findAll();
  },

  async findOne(id: string): Promise<UserRow> {
    return await userRepository.findOne(id);
  },

  async createAuthUser(dto: CreateAuthUserDTO): Promise<UserResponse> {
    const payload: CreateAuthUserPayload = {
      email: dto.email,
      password: dto.password,
      email_confirm: true,

      user_metadata: {
        name: dto.name,
        role: dto.role,
      },
    };

    const user = await userRepository.createAuthUser(payload);

    return {
      id: user.id,
      name: user.user_metadata.name,
      email: user.email!,
      role: user.app_metadata.role,
    };
  },

  async update(id: string, dto: UpdateUserDTO): Promise<UserRow> {
    return await userRepository.update(id, dto);
  },
};
