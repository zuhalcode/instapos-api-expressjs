//#region-imports

import express from "express";

import { isAuthenticated } from "./middlewares/auth";
import { userController } from "./modules/user";
import { authController } from "./modules/auth";
import { authorize } from "./middlewares/authorize";
import { productController } from "./modules/product";
import { categoryController } from "./modules/categories";

//#endregion

const router = express.Router();

// AUTH
router.post("/auth/login", authController.login);
router.post("/auth/logout", isAuthenticated, authController.logout);

// USERS [SUPERUSER]
router.get(
  "/users",
  isAuthenticated,
  authorize("superuser", "cashier"),
  userController.findAll,
);

router.get(
  "/users/:id",
  isAuthenticated,
  authorize("superuser", "cashier"),
  userController.findOne,
);

router.post(
  "/users",
  isAuthenticated,
  authorize("superuser", "cashier"),
  userController.createAuthUser,
);

router.patch(
  "/users/:id",
  isAuthenticated,
  authorize("superuser", "cashier"),
  userController.update,
);

// CATEGORIES
router.get(
  "/categories",
  isAuthenticated,
  authorize("superuser", "cashier"),
  categoryController.findAll,
);

router.post(
  "/categories",
  isAuthenticated,
  authorize("superuser", "cashier"),
  categoryController.create,
);

// PRODUCTS
router.get(
  "/products",
  isAuthenticated,
  authorize("superuser", "cashier"),
  productController.findAll,
);

router.post(
  "/products",
  isAuthenticated,
  authorize("superuser", "cashier"),
  productController.create,
);

router.patch(
  "/products/:id",
  isAuthenticated,
  authorize("superuser", "cashier"),
  productController.update,
);

// TRASH
// router.get("/trash", isAuthenticated, trashController.findAll);
// router.post("/trash/:resource/:id", isAuthenticated, trashController.restore);
// router.delete("/trash/:resource/:id", isAuthenticated, trashController.destroy);

export default router;
