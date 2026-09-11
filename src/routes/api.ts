//#region-imports

import express from "express";

// import authController from "../controllers/auth.controller";

// import assetBalanceController from "../controllers/asset-balance.controller";

import { isAuthenticated } from "../middlewares/auth";

// import { assetTransactionController } from "../modules/asset-transaction";
// import { capitalController } from "../modules/capital";
// import { assetController } from "../modules/asset";
// import trashController from "../modules/trash/trash.controller";
import productController from "../modules/product/product.controller";
// import { productCategoryController } from "../modules/product-category";
// import { backupController } from "../modules/backup";

//#endregion

const router = express.Router();

// AUTH
// router.get("/auth/me", isAuthenticated, authController.me);

// PRODUCTS
router.get("/products", isAuthenticated, productController.findAll);

// router.post(
//   "/products",
//   isAuthenticated,
//   // upload.single("image"),
//   productController.create,
// );
// router.patch("/products/:id", isAuthenticated, productController.update);
// router.delete("/products/:id", isAuthenticated, productController.remove);

// PRODUCT CATEGORIES
// router.get(
//   "/product-categories",
//   isAuthenticated,
//   productCategoryController.findAll,
// );

// TRASH
// router.get("/trash", isAuthenticated, trashController.findAll);
// router.post("/trash/:resource/:id", isAuthenticated, trashController.restore);
// router.delete("/trash/:resource/:id", isAuthenticated, trashController.destroy);

export default router;
