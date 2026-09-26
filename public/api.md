# API Documentation

- [Users](#users)
- [Categories](#categories)
- [Products](#products)
- [Suppliers](#suppliers)
- [Purchase Orders](#purchase-orders)
- [Purchase Order Items](#purchase-order-items)

---

## Users

| ENDPOINT     | METHOD  | AUTHORIZE   | NOTE           |
| ------------ | ------- | ----------- | -------------- |
| `/users`     | `GET`   | `SUPERUSER` | Get all users  |
| `/users/:id` | `GET`   | `SUPERUSER` | Get user by ID |
| `/users`     | `POST`  | `SUPERUSER` | Create user    |
| `/users/:id` | `PATCH` | `SUPERUSER` | Update user    |

---

## Categories

| ENDPOINT          | METHOD  | AUTHORIZE                | NOTE               |
| ----------------- | ------- | ------------------------ | ------------------ |
| `/categories`     | `GET`   | `SUPERUSER` `CASHIER`    | Get all categories |
| `/categories`     | `POST`  | `SUPERUSER` `SUPERVISOR` | Create category    |
| `/categories/:id` | `PATCH` | `SUPERUSER` `SUPERVISOR` | Update category    |

---

## Products

| ENDPOINT        | METHOD  | AUTHORIZE                | NOTE              |
| --------------- | ------- | ------------------------ | ----------------- |
| `/products`     | `GET`   | `*`                      | Get all products  |
| `/products/:id` | `GET`   | `*`                      | Get product by ID |
| `/products`     | `POST`  | `SUPERUSER` `SUPERVISOR` | Create product    |
| `/products/:id` | `PATCH` | `SUPERUSER` `SUPERVISOR` | Update product    |

---

## Suppliers

| ENDPOINT         | METHOD  | AUTHORIZE                | NOTE               |
| ---------------- | ------- | ------------------------ | ------------------ |
| `/suppliers`     | `GET`   | `SUPERUSER` `SUPERVISOR` | Get all suppliers  |
| `/suppliers/:id` | `GET`   | `SUPERUSER` `SUPERVISOR` | Get supplier by ID |
| `/suppliers`     | `POST`  | `SUPERUSER` `SUPERVISOR` | Create supplier    |
| `/suppliers/:id` | `PATCH` | `SUPERUSER` `SUPERVISOR` | Update supplier    |

---

## Purchase Orders

| ENDPOINT               | METHOD | AUTHORIZE                | NOTE                                          |
| ---------------------- | ------ | ------------------------ | --------------------------------------------- |
| `/purchase-orders`     | `GET`  | `SUPERUSER` `SUPERVISOR` | Get All Purchase Orders                       |
| `/purchase-orders/:id` | `GET`  | `SUPERUSER` `SUPERVISOR` | Detail Purchase Orders + Purchase Order Items |

---
