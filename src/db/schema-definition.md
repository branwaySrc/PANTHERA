# Panthera Supabase Schema Definition

이 파일은 Panthera IDE의 데이터베이스 구조를 관리하는 **설계 도면**입니다.
Antigravity는 이 파일의 명세를 기반으로 프로젝트의 타입 시스템과 정합성을 유지합니다.

## Tables

### 1. profiles

사용자의 개인 정보 및 설정을 관리합니다.

- `id`: `uuid` (PK, references auth.users)
- `email`: `text` (Unique)
- `full_name`: `text`
- `avatar_url`: `text`
- `updated_at`: `timestamp with time zone` (default: now())

### 2. projects

사용자가 소유하거나 참여하는 프로젝트 워크스페이스입니다.

- `id`: `uuid` (PK, default: uuid_generate_v4())
- `name`: `text` (Required)
- `description`: `text`
- `language`: `text` (e.g., 'typescript', 'python')
- `created_at`: `timestamp with time zone` (default: now())
- `updated_at`: `timestamp with time zone` (default: now())
- `owner_id`: `uuid` (FK, references profiles.id)

### 3. file_nodes

프로젝트 내부의 파일 및 폴더 트리 구조를 플랫하게 저장합니다.

- `id`: `uuid` (PK, default: uuid_generate_v4())
- `name`: `text` (Required)
- `type`: `text` (Constraint: 'file' OR 'folder')
- `content`: `text` (nullable, for files only)
- `parent_id`: `uuid` (FK, references file_nodes.id, nullable)
- `project_id`: `uuid` (FK, references projects.id)
- `created_at`: `timestamp with time zone` (default: now())
- `updated_at`: `timestamp with time zone` (default: now())

## Constraints & Relationships

- **Recursivity**: `file_nodes.parent_id`는 동일 테이블의 `id`를 참조하여 트리 구조를 형성합니다.
- **Cascading**: 프로젝트 삭제 시 해당 `project_id`를 가진 모든 `file_nodes`가 삭제되어야 합니다.

## SQL DDL (Reference)

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  language TEXT,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File Nodes table
CREATE TABLE file_nodes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('file', 'folder')) NOT NULL,
  content TEXT,
  parent_id UUID REFERENCES file_nodes(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
