CREATE TABLE tenants (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  tenant_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  tenant_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE roles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  scope VARCHAR(20) NOT NULL DEFAULT 'TENANT',
  tenant_id UUID UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  constraint unique_role_name_tenant UNIQUE (name, tenant_id)
);

CREATE TABLE permissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  tenant_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  description VARCHAR(500),
  project_status VARCHAR(20) NOT NULL DEFAULT 'TODO',
  tenant_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  description VARCHAR(1000),
  due_date TIMESTAMP,
  task_status VARCHAR(20) NOT NULL DEFAULT 'TODO',
  project_id BIGINT NOT NULL,
  assigned_user_id BIGINT,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  tenant_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  CONSTRAINT fk_tasks_user FOREIGN KEY (assigned_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE users_roles (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE roles_permissions (
  role_id BIGINT NOT NULL,
  permission_id BIGINT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT fk_roles_permissions_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  CONSTRAINT fk_roles_permissions_permission FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

CREATE TABLE projects_users (
  project_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  PRIMARY KEY (project_id, user_id),
  CONSTRAINT fk_projects_users_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  CONSTRAINT fk_projects_users_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_roles_tenant_id ON roles(tenant_id);
CREATE INDEX idx_permissions_tenant_id ON permissions(tenant_id);
CREATE INDEX idx_projects_tenant_id ON projects(tenant_id);
CREATE INDEX idx_tasks_tenant_id ON tasks(tenant_id);

INSERT INTO roles (name, scope) VALUES ('PLATFORM_ADMIN', 'PLATFORM');
INSERT INTO roles (name, scope) VALUES ('SUPER_ADMIN', 'PLATFORM');