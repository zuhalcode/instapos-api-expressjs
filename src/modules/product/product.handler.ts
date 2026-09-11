import { TrashHandler } from "../trash/trash.types";
import productService from "./product.service";

export const productTrashHandler: TrashHandler = {
  restore: (id) => productService.restore(id),
  destroy: (id) => productService.destroy(id),
};
