//#region-imports

import express from "express";

import { isAuthenticated } from "./middlewares/auth";
import { userController } from "./modules/user";
import { authController } from "./modules/auth";
import { authorize } from "./middlewares/authorize";

//#endregion

const router = express.Router();

// AUTH
router.post("/auth/login", authController.login);
router.post("/auth/logout", isAuthenticated, authController.logout);

// USERS
router.get(
  "/users",
  isAuthenticated,
  authorize("superuser"),
  userController.findAll,
);

router.get(
  "/users/:id",
  isAuthenticated,
  authorize("superuser"),
  userController.findOne,
);

router.post(
  "/users",
  isAuthenticated,
  authorize("superuser"),
  userController.createAuthUser,
);

// PRODUCTS
// router.get("/products", isAuthenticated, productController.findAll);

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
