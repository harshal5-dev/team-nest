// Mock API Service for Projects
// Simulates backend calls with delays

// Status enum matching backend
export const ProjectStatus = {
  ACTIVE: "ACTIVE",
  ON_HOLD: "ON_HOLD",
  COMPLETED: "COMPLETED",
  ARCHIVED: "ARCHIVED",
};

// Mock users data
export const mockUsers = [
  { id: 1, name: "Harshal Ganbote", email: "harshal@teamnest.app", initials: "HG" },
  { id: 2, name: "Sarah Chen", email: "sarah@teamnest.app", initials: "SC" },
  { id: 3, name: "Mike Wilson", email: "mike@teamnest.app", initials: "MW" },
  { id: 4, name: "Emma Davis", email: "emma@teamnest.app", initials: "ED" },
  { id: 5, name: "James Brown", email: "james@teamnest.app", initials: "JB" },
];

// Mock projects data matching backend model
let mockProjects = [
  {
    id: 1,
    tenantId: "550e8400-e29b-41d4-a716-446655440000",
    name: "Team Nest App",
    description: "Multi-tenant team collaboration platform with project management, task tracking, and real-time updates.",
    status: ProjectStatus.ACTIVE,
    createdAt: "2026-01-15T10:30:00Z",
    lastModifiedAt: "2026-02-10T14:20:00Z",
    tasks: [
      { id: 1, title: "Design UI", completed: true },
      { id: 2, title: "Implement Auth", completed: true },
      { id: 3, title: "Create Dashboard", completed: false },
      { id: 4, title: "Add Task Management", completed: false },
    ],
    users: [mockUsers[0], mockUsers[1], mockUsers[2]],
  },
  {
    id: 2,
    tenantId: "550e8400-e29b-41d4-a716-446655440000",
    name: "Portfolio Website",
    description: "Personal portfolio website showcasing projects and skills with modern animations.",
    status: ProjectStatus.ACTIVE,
    createdAt: "2026-01-20T09:15:00Z",
    lastModifiedAt: "2026-02-08T11:45:00Z",
    tasks: [
      { id: 5, title: "Design Homepage", completed: true },
      { id: 6, title: "Add Projects Section", completed: true },
      { id: 7, title: "Implement Dark Mode", completed: true },
    ],
    users: [mockUsers[0]],
  },
  {
    id: 3,
    tenantId: "550e8400-e29b-41d4-a716-446655440000",
    name: "Backend API",
    description: "Spring Boot REST API with JWT authentication, PostgreSQL database, and multi-tenant support.",
    status: ProjectStatus.ACTIVE,
    createdAt: "2026-01-10T08:00:00Z",
    lastModifiedAt: "2026-02-09T16:30:00Z",
    tasks: [
      { id: 8, title: "Setup Spring Boot", completed: true },
      { id: 9, title: "Configure Database", completed: true },
      { id: 10, title: "Implement Auth", completed: false },
      { id: 11, title: "Create Project Endpoints", completed: false },
      { id: 12, title: "Add Task Endpoints", completed: false },
    ],
    users: [mockUsers[0], mockUsers[4]],
  },
  {
    id: 4,
    tenantId: "550e8400-e29b-41d4-a716-446655440000",
    name: "Mobile App",
    description: "React Native mobile application for team collaboration on the go.",
    status: ProjectStatus.ON_HOLD,
    createdAt: "2026-02-01T14:00:00Z",
    lastModifiedAt: "2026-02-05T10:00:00Z",
    tasks: [
      { id: 13, title: "Design Mockups", completed: true },
      { id: 14, title: "Setup Project", completed: false },
    ],
    users: [mockUsers[1], mockUsers[3]],
  },
  {
    id: 5,
    tenantId: "550e8400-e29b-41d4-a716-446655440000",
    name: "Design System",
    description: "Comprehensive design system with reusable components, color tokens, and typography.",
    status: ProjectStatus.COMPLETED,
    createdAt: "2025-12-01T09:00:00Z",
    lastModifiedAt: "2026-01-25T17:00:00Z",
    tasks: [
      { id: 15, title: "Define Colors", completed: true },
      { id: 16, title: "Create Components", completed: true },
      { id: 17, title: "Document Usage", completed: true },
    ],
    users: [mockUsers[0], mockUsers[1]],
  },
];

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// API Response wrapper
const apiResponse = (data, success = true) => ({
  success,
  data,
  timestamp: new Date().toISOString(),
});

// GET all projects
export async function getProjects() {
  await delay(500);
  return apiResponse(mockProjects);
}

// GET single project by ID
export async function getProjectById(id) {
  await delay(300);
  const project = mockProjects.find((p) => p.id === id);
  if (!project) {
    throw new Error("Project not found");
  }
  return apiResponse(project);
}

// POST create new project
export async function createProject(projectData) {
  await delay(600);
  const newProject = {
    id: Math.max(...mockProjects.map((p) => p.id)) + 1,
    tenantId: "550e8400-e29b-41d4-a716-446655440000",
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    tasks: [],
    users: projectData.userIds 
      ? mockUsers.filter((u) => projectData.userIds.includes(u.id))
      : [],
    ...projectData,
  };
  mockProjects = [...mockProjects, newProject];
  return apiResponse(newProject);
}

// PUT update project
export async function updateProject(id, projectData) {
  await delay(500);
  const index = mockProjects.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error("Project not found");
  }
  const updatedProject = {
    ...mockProjects[index],
    ...projectData,
    lastModifiedAt: new Date().toISOString(),
    users: projectData.userIds
      ? mockUsers.filter((u) => projectData.userIds.includes(u.id))
      : mockProjects[index].users,
  };
  mockProjects = mockProjects.map((p) => (p.id === id ? updatedProject : p));
  return apiResponse(updatedProject);
}

// DELETE project
export async function deleteProject(id) {
  await delay(400);
  const index = mockProjects.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error("Project not found");
  }
  mockProjects = mockProjects.filter((p) => p.id !== id);
  return apiResponse({ deleted: true, id });
}

// GET project stats
export async function getProjectStats() {
  await delay(200);
  const stats = {
    total: mockProjects.length,
    active: mockProjects.filter((p) => p.status === ProjectStatus.ACTIVE).length,
    onHold: mockProjects.filter((p) => p.status === ProjectStatus.ON_HOLD).length,
    completed: mockProjects.filter((p) => p.status === ProjectStatus.COMPLETED).length,
    archived: mockProjects.filter((p) => p.status === ProjectStatus.ARCHIVED).length,
  };
  return apiResponse(stats);
}

// Export for testing
export { mockProjects };
