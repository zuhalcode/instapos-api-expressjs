//#region-imports

import memberRepository from "./member.repository";
import {
  CreateMemberDTO,
  MemberQueryDTO,
  UpdateMemberDTO,
} from "./member.schema";
import { MemberInsert, MemberRow, MemberUpdate } from "./member.types";

//#endregion

export default {
  async findAll(query: MemberQueryDTO): Promise<MemberRow[]> {
    return memberRepository.findAll(query.search);
  },

  async findOne(id: string): Promise<MemberRow> {
    return memberRepository.findOne(id);
  },

  async create(dto: CreateMemberDTO): Promise<MemberRow> {
    let codeMember = dto.code_member;

    if (!codeMember) {
      const latest = await memberRepository.getLatestMemberCode();

      if (latest && /^MEM\d+$/i.test(latest)) {
        const num = parseInt(latest.replace(/^MEM/i, ""), 10);
        if (!isNaN(num)) {
          codeMember = `MEM${String(num + 1).padStart(3, "0")}`;
        }
      }

      if (!codeMember) {
        codeMember = `MEM${Date.now().toString().slice(-4)}`;
      }
    }

    const payload: MemberInsert = {
      name: dto.name,
      code_member: codeMember,
      phone_number: dto.phone_number ?? null,
      point: dto.point ?? 0,
    };

    return memberRepository.create(payload);
  },

  async update(id: string, dto: UpdateMemberDTO): Promise<MemberRow> {
    const payload: MemberUpdate = {
      updated_at: new Date().toISOString(),
    };

    if (dto.name !== undefined) payload.name = dto.name;
    if (dto.phone_number !== undefined) payload.phone_number = dto.phone_number;
    if (dto.code_member !== undefined) payload.code_member = dto.code_member;
    if (dto.point !== undefined) payload.point = dto.point;

    return memberRepository.update(id, payload);
  },
};
