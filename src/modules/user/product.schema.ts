import * as Yup from "yup";
import { ProductStatus } from "./user.types";

export const createProductSchema = Yup.object({
  category_code: Yup.string().min(1).defined(),
  name: Yup.string().nullable().required(),
  description: Yup.string().nullable().required(),
  weight: Yup.number().positive().required(),
  status: Yup.mixed<ProductStatus>()
    .oneOf(["display", "warehouse", "repair", "melt"])
    .required(),
  karat: Yup.number().integer().positive().required(),
});

export const updateProductSchema = Yup.object({
  name: Yup.string().nullable().required(),
  description: Yup.string().nullable().required(),
  weight: Yup.number().positive().required(),
  status: Yup.mixed<ProductStatus>()
    .oneOf(["display", "warehouse", "repair", "melt"])
    .required(),
  karat: Yup.number().integer().positive().required(),
});

export const uuidProductSchema = Yup.object({
  id: Yup.string().uuid("Invalid ID").required("Id is required"),
});
