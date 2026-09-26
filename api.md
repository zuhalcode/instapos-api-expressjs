# USER API

| Endpoint     | Authorize   | Method   |
| ------------ | ----------- | -------- |
| `/users`     | `superuser` | `GET`    |
| `/users/:id` | `owner`     | `GET`    |
| `/users`     | `owner`     | `POST`   |
| `/users/:id` | `owner`     | `PUT`    |
| `/users/:id` | `owner`     | `DELETE` |

# CATEGORY API

| Endpoint     | Authorize        | Method   |
| ------------ | ---------------- | -------- |
| `/users`     | `owner`, `admin` | `GET`    |
| `/users/:id` | `owner`, `admin` | `GET`    |
| `/users`     | `owner`, `admin` | `POST`   |
| `/users/:id` | `owner`, `admin` | `PUT`    |
| `/users/:id` | `owner`, `admin` | `DELETE` |

## Status

- Users CRUD
