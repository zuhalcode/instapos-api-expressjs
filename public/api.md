# API Documentation

- [Users](#users)
- [Categories](#categories)
- [Products](#products)

---

## Users

| ENDPOINT     | METHOD | AUTHORIZE   | NOTE           |
| ------------ | ------ | ----------- | -------------- |
| `/users`     | GET    | `SUPERUSER` | Get all users  |
| `/users/:id` | GET    | `SUPERUSER` | Get user by ID |
| `/users`     | POST   | `SUPERUSER` | Create user    |
| `/users/:id` | PATCH  | `SUPERUSER` | Update user    |

---

## Categories

| ENDPOINT          | METHOD | AUTHORIZE                 | NOTE               |
| ----------------- | ------ | ------------------------- | ------------------ |
| `/categories`     | GET    | `SUPERUSER`, `CASHIER`    | Get all categories |
| `/categories`     | POST   | `SUPERUSER`, `SUPERVISOR` | Create category    |
| `/categories/:id` | PATCH  | `SUPERUSER`, `SUPERVISOR` | Update category    |

---

## Products

| ENDPOINT | METHOD | AUTHORIZE | NOTE |
| -------- | ------ | --------- | ---- |
| —        | —      | —         | —    |
