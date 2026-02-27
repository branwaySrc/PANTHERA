# Consistency Review: schema-definition.md vs Frontend properties

## 1. Projects Table

| Column (Schema) | Frontend (Project type) | Match | Notes |
| :-------------- | :---------------------- | :---: | :---- |
| `id`            | `id`                    |  ✅   |       |
| `name`          | `name`                  |  ✅   |       |
| `description`   | `description`           |  ✅   |       |
| `language`      | `language`              |  ✅   |       |
| `owner_id`      | `owner_id`              |  ✅   |       |
| `created_at`    | `created_at`            |  ✅   |       |
| `updated_at`    | `updated_at`            |  ✅   |       |

## 2. File Nodes Table

| Column (Schema) | Frontend (FileNode type) | Match | Notes              |
| :-------------- | :----------------------- | :---: | :----------------- |
| `id`            | `id`                     |  ✅   |                    |
| `name`          | `name`                   |  ✅   |                    |
| `type`          | `type`                   |  ✅   | 'file' OR 'folder' |
| `content`       | `content`                |  ✅   |                    |
| `parent_id`     | `parent_id`              |  ✅   |                    |
| `project_id`    | `project_id`             |  ✅   |                    |
| `created_at`    | `created_at`             |  ✅   |                    |
| `updated_at`    | `updated_at`             |  ✅   |                    |

## 3. Findings

- The property names in `database.types.ts` are 1:1 mapped from `schema-definition.md`.
- `use-file-store.ts` and components are using these types, ensuring consistency.
