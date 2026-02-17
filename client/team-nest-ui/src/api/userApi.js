// Mock API Service for Users and Roles
// Simulates backend calls with delays

// User Status enum
export const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
  SUSPENDED: "SUSPENDED",
};

// Mock Roles data
let mockRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access with all permissions",
    color: "from-red-500 to-rose-600",
    permissions: ["users.create", "users.read", "users.update", "users.delete", "roles.manage", "projects.manage", "settings.manage"],
    usersCount: 2,
    createdAt: "2025-01-01T00:00:00Z",
    isSystem: true,
  },
  {
    id: 2,
    name: "Manager",
    description: "Can manage team members and projects",
    color: "from-violet-500 to-purple-600",
    permissions: ["users.read", "users.update", "projects.manage", "tasks.manage"],
    usersCount: 3,
    createdAt: "2025-01-01T00:00:00Z",
    isSystem: true,
  },
  {
    id: 3,
    name: "Developer",
    description: "Access to projects and tasks",
    color: "from-blue-500 to-cyan-500",
    permissions: ["projects.read", "tasks.manage", "users.read"],
    usersCount: 5,
    createdAt: "2025-01-15T00:00:00Z",
    isSystem: false,
  },
  {
    id: 4,
    name: "Designer",
    description: "Access to design projects and assets",
    color: "from-pink-500 to-rose-500",
    permissions: ["projects.read", "tasks.read", "tasks.update", "users.read"],
    usersCount: 2,
    createdAt: "2025-02-01T00:00:00Z",
    isSystem: false,
  },
  {
    id: 5,
    name: "Viewer",
    description: "Read-only access to projects",
    color: "from-gray-500 to-slate-600",
    permissions: ["projects.read", "tasks.read", "users.read"],
    usersCount: 4,
    createdAt: "2025-01-10T00:00:00Z",
    isSystem: true,
  },
];

// Available permissions
export const availablePermissions = [
  { id: "users.create", label: "Create Users", category: "Users" },
  { id: "users.read", label: "View Users", category: "Users" },
  { id: "users.update", label: "Update Users", category: "Users" },
  { id: "users.delete", label: "Delete Users", category: "Users" },
  { id: "roles.manage", label: "Manage Roles", category: "Roles" },
  { id: "projects.read", label: "View Projects", category: "Projects" },
  { id: "projects.manage", label: "Manage Projects", category: "Projects" },
  { id: "tasks.read", label: "View Tasks", category: "Tasks" },
  { id: "tasks.manage", label: "Manage Tasks", category: "Tasks" },
  { id: "tasks.update", label: "Update Tasks", category: "Tasks" },
  { id: "settings.manage", label: "Manage Settings", category: "Settings" },
];

// Mock Users data
let mockUsers = [
  {
    id: 1,
    firstName: "Harshal",
    lastName: "Ganbote",
    email: "harshal@teamnest.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshal",
    initials: "HG",
    phone: "+1 555-0101",
    department: "Engineering",
    jobTitle: "Senior Developer",
    roleId: 1,
    role: mockRoles[0],
    status: UserStatus.ACTIVE,
    lastActive: "2026-02-13T10:30:00Z",
    createdAt: "2025-01-15T10:30:00Z",
    lastModifiedAt: "2026-02-10T14:20:00Z",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah@teamnest.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    initials: "SC",
    phone: "+1 555-0102",
    department: "Design",
    jobTitle: "Lead Designer",
    roleId: 2,
    role: mockRoles[1],
    status: UserStatus.ACTIVE,
    lastActive: "2026-02-13T09:15:00Z",
    createdAt: "2025-02-01T09:00:00Z",
    lastModifiedAt: "2026-02-08T11:45:00Z",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Wilson",
    email: "mike@teamnest.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    initials: "MW",
    phone: "+1 555-0103",
    department: "Engineering",
    jobTitle: "Full Stack Developer",
    roleId: 3,
    role: mockRoles[2],
    status: UserStatus.ACTIVE,
    lastActive: "2026-02-12T16:30:00Z",
    createdAt: "2025-03-10T08:00:00Z",
    lastModifiedAt: "2026-02-09T16:30:00Z",
  },
  {
    id: 4,
    firstName: "Emma",
    lastName: "Davis",
    email: "emma@teamnest.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    initials: "ED",
    phone: "+1 555-0104",
    department: "Marketing",
    jobTitle: "Marketing Manager",
    roleId: 2,
    role: mockRoles[1],
    status: UserStatus.INACTIVE,
    lastActive: "2026-02-05T10:00:00Z",
    createdAt: "2025-04-01T14:00:00Z",
    lastModifiedAt: "2026-02-05T10:00:00Z",
  },
  {
    id: 5,
    firstName: "James",
    lastName: "Brown",
    email: "james@teamnest.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    initials: "JB",
    phone: "+1 555-0105",
    department: "Engineering",
    jobTitle: "DevOps Engineer",
    roleId: 3,
    role: mockRoles[2],
    status: UserStatus.ACTIVE,
    lastActive: "2026-02-13T08:00:00Z",
    createdAt: "2025-05-15T09:00:00Z",
    lastModifiedAt: "2026-01-25T17:00:00Z",
  },
  {
    id: 6,
    firstName: "Lisa",
    lastName: "Park",
    email: "lisa@teamnest.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    initials: "LP",
    phone: "+1 555-0106",
    department: "Product",
    jobTitle: "Product Manager",
    roleId: 2,
    role: mockRoles[1],
    status: UserStatus.ACTIVE,
    lastActive: "2026-02-13T11:00:00Z",
    createdAt: "2025-06-01T10:00:00Z",
    lastModifiedAt: "2026-02-12T09:00:00Z",
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Kim",
    email: "david@teamnest.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    initials: "DK",
    phone: "+1 555-0107",
    department: "Design",
    jobTitle: "UX Researcher",
    roleId: 4,
    role: mockRoles[3],
    status: UserStatus.PENDING,
    lastActive: null,
    createdAt: "2026-02-10T14:00:00Z",
    lastModifiedAt: "2026-02-10T14:00:00Z",
  },
  {
    id: 8,
    firstName: "Rachel",
    lastName: "Green",
    email: "rachel@teamnest.app",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
    initials: "RG",
    phone: "+1 555-0108",
    department: "Engineering",
    jobTitle: "Frontend Developer",
    roleId: 3,
    role: mockRoles[2],
    status: UserStatus.SUSPENDED,
    lastActive: "2026-01-20T15:00:00Z",
    createdAt: "2025-07-01T11:00:00Z",
    lastModifiedAt: "2026-02-01T10:00:00Z",
  },
];

// Departments list
export const departments = [
  "Engineering",
  "Design",
  "Marketing",
  "Product",
  "Sales",
  "Support",
  "HR",
  "Finance",
];

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// API Response wrapper
const apiResponse = (data, success = true) => ({
  success,
  data,
  timestamp: new Date().toISOString(),
});

// ============ USER API ============

// GET all users
export async function getUsers() {
  await delay(500);
  return apiResponse(mockUsers);
}

// GET single user by ID
export async function getUserById(id) {
  await delay(300);
  const user = mockUsers.find((u) => u.id === id);
  if (!user) {
    throw new Error("User not found");
  }
  return apiResponse(user);
}

// POST create new user
export async function createUser(userData) {
  await delay(600);
  const role = mockRoles.find((r) => r.id === userData.roleId);
  const newUser = {
    id: Math.max(...mockUsers.map((u) => u.id)) + 1,
    initials: `${userData.firstName?.[0] || ""}${userData.lastName?.[0] || ""}`.toUpperCase(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName}`,
    status: UserStatus.PENDING,
    lastActive: null,
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    role: role || mockRoles[4],
    ...userData,
  };
  mockUsers = [...mockUsers, newUser];
  
  // Update role user count
  if (role) {
    mockRoles = mockRoles.map((r) =>
      r.id === role.id ? { ...r, usersCount: r.usersCount + 1 } : r
    );
  }
  
  return apiResponse(newUser);
}

// PUT update user
export async function updateUser(id, userData) {
  await delay(500);
  const index = mockUsers.findIndex((u) => u.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  
  const oldRoleId = mockUsers[index].roleId;
  const newRole = userData.roleId ? mockRoles.find((r) => r.id === userData.roleId) : mockUsers[index].role;
  
  const updatedUser = {
    ...mockUsers[index],
    ...userData,
    role: newRole,
    initials: userData.firstName && userData.lastName
      ? `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
      : mockUsers[index].initials,
    lastModifiedAt: new Date().toISOString(),
  };
  mockUsers = mockUsers.map((u) => (u.id === id ? updatedUser : u));
  
  // Update role user counts if role changed
  if (userData.roleId && userData.roleId !== oldRoleId) {
    mockRoles = mockRoles.map((r) => {
      if (r.id === oldRoleId) return { ...r, usersCount: Math.max(0, r.usersCount - 1) };
      if (r.id === userData.roleId) return { ...r, usersCount: r.usersCount + 1 };
      return r;
    });
  }
  
  return apiResponse(updatedUser);
}

// DELETE user
export async function deleteUser(id) {
  await delay(400);
  const user = mockUsers.find((u) => u.id === id);
  if (!user) {
    throw new Error("User not found");
  }
  
  mockUsers = mockUsers.filter((u) => u.id !== id);
  
  // Update role user count
  mockRoles = mockRoles.map((r) =>
    r.id === user.roleId ? { ...r, usersCount: Math.max(0, r.usersCount - 1) } : r
  );
  
  return apiResponse({ deleted: true, id });
}

// GET user stats
export async function getUserStats() {
  await delay(200);
  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === UserStatus.ACTIVE).length,
    inactive: mockUsers.filter((u) => u.status === UserStatus.INACTIVE).length,
    pending: mockUsers.filter((u) => u.status === UserStatus.PENDING).length,
    suspended: mockUsers.filter((u) => u.status === UserStatus.SUSPENDED).length,
    byDepartment: departments.map((dept) => ({
      name: dept,
      count: mockUsers.filter((u) => u.department === dept).length,
    })),
    byRole: mockRoles.map((role) => ({
      name: role.name,
      count: mockUsers.filter((u) => u.roleId === role.id).length,
    })),
  };
  return apiResponse(stats);
}

// ============ ROLE API ============

// GET all roles
export async function getRoles() {
  await delay(400);
  return apiResponse(mockRoles);
}

// GET single role by ID
export async function getRoleById(id) {
  await delay(300);
  const role = mockRoles.find((r) => r.id === id);
  if (!role) {
    throw new Error("Role not found");
  }
  return apiResponse(role);
}

// POST create new role
export async function createRole(roleData) {
  await delay(600);
  const newRole = {
    id: Math.max(...mockRoles.map((r) => r.id)) + 1,
    usersCount: 0,
    createdAt: new Date().toISOString(),
    isSystem: false,
    ...roleData,
  };
  mockRoles = [...mockRoles, newRole];
  return apiResponse(newRole);
}

// PUT update role
export async function updateRole(id, roleData) {
  await delay(500);
  const index = mockRoles.findIndex((r) => r.id === id);
  if (index === -1) {
    throw new Error("Role not found");
  }
  
  const updatedRole = {
    ...mockRoles[index],
    ...roleData,
  };
  mockRoles = mockRoles.map((r) => (r.id === id ? updatedRole : r));
  
  // Update users with this role
  mockUsers = mockUsers.map((u) =>
    u.roleId === id ? { ...u, role: updatedRole } : u
  );
  
  return apiResponse(updatedRole);
}

// DELETE role
export async function deleteRole(id) {
  await delay(400);
  const role = mockRoles.find((r) => r.id === id);
  if (!role) {
    throw new Error("Role not found");
  }
  if (role.isSystem) {
    throw new Error("Cannot delete system role");
  }
  if (role.usersCount > 0) {
    throw new Error("Cannot delete role with assigned users");
  }
  
  mockRoles = mockRoles.filter((r) => r.id !== id);
  return apiResponse({ deleted: true, id });
}

// GET role stats
export async function getRoleStats() {
  await delay(200);
  const stats = {
    total: mockRoles.length,
    system: mockRoles.filter((r) => r.isSystem).length,
    custom: mockRoles.filter((r) => !r.isSystem).length,
    totalUsers: mockUsers.length,
  };
  return apiResponse(stats);
}

// Export for testing
export { mockUsers, mockRoles };
