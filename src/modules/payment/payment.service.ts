//#region-imports

import paymentRepository from "./payment.repository";
import { CreatePaymentDTO, UpdatePaymentDTO } from "./payment.schema";
import { PaymentInsert, PaymentRow, PaymentUpdate } from "./payment.types";
//#endregion

export default {
  async findAll(): Promise<PaymentRow[]> {
    return paymentRepository.findAll();
  },

  async findOne(id: string): Promise<PaymentRow> {
    return paymentRepository.findOne(id);
  },

  async create(dto: CreatePaymentDTO): Promise<PaymentRow> {
    const payload: PaymentInsert = {
      method: dto.method,
      sale_id: dto.sale_id,
      amount: dto.amount,
      paid_amount: dto.paid_amount,
    };

    return paymentRepository.create(payload);
  },

  // async update(id: string, dto: UpdatePaymentDTO): Promise<PaymentRow> {
  //   return paymentRepository.update(id, dto);
  // },
};
