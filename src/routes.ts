//#region-imports

import express from "express";
import { isAuthenticated } from "./middlewares/auth";
import { userController } from "./modules/user";
import { authController } from "./modules/auth";
import { authorize } from "./middlewares/authorize";
import { productController } from "./modules/product";
import { categoryController } from "./modules/category";
import { ROLES } from "./shared";
import { supplierController } from "./modules/supplier";

//#endregion

const router = express.Router();

// AUTH
router.post("/auth/login", authController.login);
router.post("/auth/logout", isAuthenticated, authController.logout);

//#region-users

router.get(
  "/users",
  isAuthenticated,
  authorize(ROLES.SUPERUSER),
  userController.findAll,
);

router.get(
  "/users/:id",
  isAuthenticated,
  authorize(ROLES.SUPERUSER),
  userController.findOne,
);

router.post(
  "/users",
  isAuthenticated,
  authorize(ROLES.SUPERUSER),
  userController.createAuthUser,
);

router.patch(
  "/users/:id",
  isAuthenticated,
  authorize(ROLES.SUPERUSER),
  userController.update,
);

//#endregion

//#region-categories

router.get(
  "/categories",
  isAuthenticated,
  authorize(ROLES.SUPERUSER, ROLES.CASHIER),
  categoryController.findAll,
);

router.post(
  "/categories",
  isAuthenticated,
  authorize(ROLES.SUPERUSER, ROLES.SUPERVISOR),
  categoryController.create,
);

router.patch(
  "/categories/:id",
  isAuthenticated,
  authorize(ROLES.SUPERUSER, ROLES.SUPERVISOR),
  categoryController.update,
);

//#endregion

//#region-products

router.get("/products", isAuthenticated, productController.findAll);
router.get("/products/:id", isAuthenticated, productController.findOne);

router.post(
  "/products",
  isAuthenticated,
  authorize(ROLES.SUPERUSER, ROLES.SUPERVISOR),
  productController.create,
);

router.patch(
  "/products/:id",
  isAuthenticated,
  authorize(ROLES.SUPERUSER, ROLES.SUPERVISOR),
  productController.update,
);

//#endregion

//#region-suppliers

router.get(
  "/suppliers",
  isAuthenticated,
  authorize(ROLES.SUPERUSER, ROLES.SUPERVISOR),
  supplierController.findAll,
);

router.get(
  "/suppliers/:id",
  isAuthenticated,
  authorize(ROLES.SUPERUSER, ROLES.SUPERVISOR),
  supplierController.findOne,
);

router.post(
  "/suppliers",
  isAuthenticated,
  authorize(ROLES.SUPERUSER, ROLES.SUPERVISOR),
  supplierController.create,
);

router.patch(
  "/suppliers/:id",
  isAuthenticated,
  authorize(ROLES.SUPERUSER, ROLES.SUPERVISOR),
  supplierController.update,
);

//#endregion

// TRASH
// router.get("/trash", isAuthenticated, trashController.findAll);
// router.post("/trash/:resource/:id", isAuthenticated, trashController.restore);
// router.delete("/trash/:resource/:id", isAuthenticated, trashController.destroy);

export default router;
