//#region-imports

import { Response } from "express";
import { IReqUser } from "../../utils/interfaces";
import response from "../../utils/response";
import memberService from "./member.service";
import { idSchema } from "../../shared";
import {
  createMemberSchema,
  memberQuerySchema,
  updateMemberSchema,
} from "./member.schema";

//#endregion

export default {
  async findAll(req: IReqUser, res: Response): Promise<void> {
    try {
      const query = memberQuerySchema.parse(req.query);
      const members = await memberService.findAll(query);
      const message: string = "Data Retrieved Successfully";

      return response.success(res, members, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async findOne(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const member = await memberService.findOne(id);
      const message: string = "Data Retrieved Successfully";

      return response.success(res, member, message);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async create(req: IReqUser, res: Response): Promise<void> {
    try {
      const dto = createMemberSchema.parse(req.body);
      const member = await memberService.create(dto);
      const message: string = "Member created successfully";

      return response.success(res, member, message, 201);
    } catch (error) {
      return response.error(res, error);
    }
  },

  async update(req: IReqUser, res: Response): Promise<void> {
    try {
      const { id } = idSchema.parse(req.params);
      const dto = updateMemberSchema.parse(req.body);
      const member = await memberService.update(id, dto);
      const message: string = "Member updated successfully";

      return response.success(res, member, message);
    } catch (error) {
      return response.error(res, error);
    }
  },
};
