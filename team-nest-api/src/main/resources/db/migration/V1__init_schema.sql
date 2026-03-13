CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  avatar VARCHAR(2000),
  email VARCHAR(250) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL,
  tenant_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(100) NOT NULL,
  scope VARCHAR(20) NOT NULL DEFAULT 'TENANT',
  tenant_id UUID,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  constraint unique_role_name_tenant UNIQUE (name, tenant_id),
  constraint unique_role_code_tenant UNIQUE (code, tenant_id)
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(100) NOT NULL,
  tenant_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  constraint unique_permission_name_tenant UNIQUE (name, tenant_id),
  constraint unique_permission_code_tenant UNIQUE (code, tenant_id)
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(250) NOT NULL,
  description VARCHAR(500),
  project_status VARCHAR(20) NOT NULL DEFAULT 'TODO',
  tenant_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(250) NOT NULL,
  description VARCHAR(1000),
  due_date TIMESTAMP,
  task_status VARCHAR(20) NOT NULL DEFAULT 'TODO',
  project_id UUID NOT NULL,
  assigned_user_id UUID,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  tenant_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  CONSTRAINT fk_tasks_user FOREIGN KEY (assigned_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  token_hash VARCHAR(128) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  CONSTRAINT fk_password_reset_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  token_hash VARCHAR(128) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE permissions_lookup (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  key VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE users_roles (
  user_id UUID NOT NULL,
  role_id UUID NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE roles_permissions (
  role_id UUID NOT NULL,
  permission_id UUID NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT fk_roles_permissions_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  CONSTRAINT fk_roles_permissions_permission FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

CREATE TABLE projects_users (
  project_id UUID NOT NULL,
  user_id UUID NOT NULL,
  PRIMARY KEY (project_id, user_id),
  CONSTRAINT fk_projects_users_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  CONSTRAINT fk_projects_users_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_roles_tenant_id ON roles(tenant_id);
CREATE INDEX idx_permissions_tenant_id ON permissions(tenant_id);
CREATE INDEX idx_projects_tenant_id ON projects(tenant_id);
CREATE INDEX idx_tasks_tenant_id ON tasks(tenant_id);
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);

INSERT INTO roles (name, code, scope) VALUES ('Admin', 'PLATFORM_ADMIN', 'PLATFORM');
INSERT INTO roles (name, code, scope) VALUES ('Super Admin', 'SUPER_ADMIN', 'PLATFORM');

INSERT INTO permissions_lookup (name, key) VALUES ('Tenant Update', 'TENANT_UPDATE');

INSERT INTO permissions_lookup (name, key) VALUES ('User Read', 'USER_READ');
INSERT INTO permissions_lookup (name, key) VALUES ('User List', 'USER_LIST');
INSERT INTO permissions_lookup (name, key) VALUES ('User Create', 'USER_CREATE');
INSERT INTO permissions_lookup (name, key) VALUES ('User Update', 'USER_UPDATE');
INSERT INTO permissions_lookup (name, key) VALUES ('User Delete', 'USER_DELETE');
INSERT INTO permissions_lookup (name, key) VALUES ('Manage User', 'USER_MANAGE');

INSERT INTO permissions_lookup (name, key) VALUES ('Role Read', 'ROLE_READ');
INSERT INTO permissions_lookup (name, key) VALUES ('Role List', 'ROLE_LIST');
INSERT INTO permissions_lookup (name, key) VALUES ('Role Create', 'ROLE_CREATE');
INSERT INTO permissions_lookup (name, key) VALUES ('Role Update', 'ROLE_UPDATE');
INSERT INTO permissions_lookup (name, key) VALUES ('Role Delete', 'ROLE_DELETE');
INSERT INTO permissions_lookup (name, key) VALUES ('Manage Role', 'ROLE_MANAGE');

INSERT INTO permissions_lookup (name, key) VALUES ('Permission Read', 'PERMISSION_READ');
INSERT INTO permissions_lookup (name, key) VALUES ('Permission List', 'PERMISSION_LIST');
INSERT INTO permissions_lookup (name, key) VALUES ('Permission Create', 'PERMISSION_CREATE');
INSERT INTO permissions_lookup (name, key) VALUES ('Permission Update', 'PERMISSION_UPDATE');
INSERT INTO permissions_lookup (name, key) VALUES ('Permission Delete', 'PERMISSION_DELETE');
INSERT INTO permissions_lookup (name, key) VALUES ('Manage Permission', 'PERMISSION_MANAGE');

INSERT INTO permissions_lookup (name, key) VALUES ('Project Read', 'PROJECT_READ');
INSERT INTO permissions_lookup (name, key) VALUES ('Project List', 'PROJECT_LIST');
INSERT INTO permissions_lookup (name, key) VALUES ('Project Create', 'PROJECT_CREATE');
INSERT INTO permissions_lookup (name, key) VALUES ('Project Update', 'PROJECT_UPDATE');
INSERT INTO permissions_lookup (name, key) VALUES ('Project Delete', 'PROJECT_DELETE');
INSERT INTO permissions_lookup (name, key) VALUES ('Manage Project', 'PROJECT_MANAGE');

INSERT INTO permissions_lookup (name, key) VALUES ('Task Read', 'TASK_READ');
INSERT INTO permissions_lookup (name, key) VALUES ('Task List', 'TASK_LIST');
INSERT INTO permissions_lookup (name, key) VALUES ('Task Create', 'TASK_CREATE');
INSERT INTO permissions_lookup (name, key) VALUES ('Task Update', 'TASK_UPDATE');
INSERT INTO permissions_lookup (name, key) VALUES ('Task Delete', 'TASK_DELETE');
INSERT INTO permissions_lookup (name, key) VALUES ('Manage Task', 'TASK_MANAGE');
