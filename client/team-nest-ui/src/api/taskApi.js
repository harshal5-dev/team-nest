// Mock API Service for Tasks
// Simulates backend calls with delays

// Task Status enum
export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

// Task Priority enum
export const TaskPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
};

// Mock users data (synced with other APIs)
export const taskUsers = [
  { id: 1, name: "Harshal Ganbote", email: "harshal@teamnest.app", initials: "HG", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshal" },
  { id: 2, name: "Sarah Chen", email: "sarah@teamnest.app", initials: "SC", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: 3, name: "Mike Wilson", email: "mike@teamnest.app", initials: "MW", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { id: 4, name: "Emma Davis", email: "emma@teamnest.app", initials: "ED", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
  { id: 5, name: "James Brown", email: "james@teamnest.app", initials: "JB", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
];

// Mock projects for task association
export const taskProjects = [
  { id: 1, name: "Team Nest App", color: "from-violet-500 to-purple-600" },
  { id: 2, name: "Portfolio Website", color: "from-blue-500 to-cyan-500" },
  { id: 3, name: "Backend API", color: "from-emerald-500 to-teal-500" },
  { id: 4, name: "Mobile App", color: "from-amber-500 to-orange-500" },
  { id: 5, name: "Design System", color: "from-pink-500 to-rose-500" },
];

// Tags/Labels
export const taskTags = [
  { id: 1, name: "Bug", color: "bg-destructive/10 text-destructive border-destructive/20" },
  { id: 2, name: "Feature", color: "bg-info/10 text-info border-info/20" },
  { id: 3, name: "Enhancement", color: "bg-primary/10 text-primary border-primary/20" },
  { id: 4, name: "Documentation", color: "bg-warning/10 text-warning border-warning/20" },
  { id: 5, name: "Design", color: "bg-pink-500/10 text-pink-600 border-pink-500/20" },
  { id: 6, name: "Testing", color: "bg-success/10 text-success border-success/20" },
  { id: 7, name: "Refactor", color: "bg-pending/10 text-pending border-pending/20" },
  { id: 8, name: "Research", color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20" },
];

// Mock Tasks data
let mockTasks = [
  {
    id: 1,
    title: "Design dashboard UI components",
    description: "Create beautiful and responsive dashboard components including stats cards, charts, and activity feeds. Ensure dark mode support.",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    projectId: 1,
    project: taskProjects[0],
    assigneeId: 1,
    assignee: taskUsers[0],
    tags: [taskTags[4], taskTags[1]],
    dueDate: "2026-02-15T23:59:59Z",
    estimatedHours: 16,
    completedAt: null,
    createdAt: "2026-02-01T10:00:00Z",
    lastModifiedAt: "2026-02-13T09:30:00Z",
    subtasks: [
      { id: 1, title: "Design stats cards", completed: true },
      { id: 2, title: "Create chart components", completed: true },
      { id: 3, title: "Build activity feed", completed: false },
      { id: 4, title: "Add animations", completed: false },
    ],
    comments: 5,
    attachments: 2,
  },
  {
    id: 2,
    title: "Implement user authentication flow",
    description: "Set up JWT-based authentication with login, register, and password reset functionality. Include OAuth2 social login options.",
    status: TaskStatus.TODO,
    priority: TaskPriority.URGENT,
    projectId: 1,
    project: taskProjects[0],
    assigneeId: 3,
    assignee: taskUsers[2],
    tags: [taskTags[1], taskTags[5]],
    dueDate: "2026-02-14T23:59:59Z",
    estimatedHours: 24,
    completedAt: null,
    createdAt: "2026-02-05T14:00:00Z",
    lastModifiedAt: "2026-02-12T16:00:00Z",
    subtasks: [
      { id: 5, title: "Set up JWT tokens", completed: false },
      { id: 6, title: "Create login page", completed: false },
      { id: 7, title: "Add OAuth2 providers", completed: false },
    ],
    comments: 3,
    attachments: 1,
  },
  {
    id: 3,
    title: "Write API documentation",
    description: "Document all REST API endpoints with examples, request/response schemas, and error codes using OpenAPI/Swagger.",
    status: TaskStatus.IN_REVIEW,
    priority: TaskPriority.MEDIUM,
    projectId: 3,
    project: taskProjects[2],
    assigneeId: 5,
    assignee: taskUsers[4],
    tags: [taskTags[3]],
    dueDate: "2026-02-18T23:59:59Z",
    estimatedHours: 12,
    completedAt: null,
    createdAt: "2026-02-08T09:00:00Z",
    lastModifiedAt: "2026-02-13T11:00:00Z",
    subtasks: [
      { id: 8, title: "Document auth endpoints", completed: true },
      { id: 9, title: "Document project endpoints", completed: true },
      { id: 10, title: "Add example requests", completed: true },
    ],
    comments: 8,
    attachments: 4,
  },
  {
    id: 4,
    title: "Fix navigation menu bug on mobile",
    description: "The hamburger menu doesn't close properly after selecting a nav item on mobile devices. Also fix z-index issues with dropdown menus.",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    projectId: 1,
    project: taskProjects[0],
    assigneeId: 2,
    assignee: taskUsers[1],
    tags: [taskTags[0]],
    dueDate: "2026-02-10T23:59:59Z",
    estimatedHours: 4,
    completedAt: "2026-02-09T15:30:00Z",
    createdAt: "2026-02-07T11:00:00Z",
    lastModifiedAt: "2026-02-09T15:30:00Z",
    subtasks: [
      { id: 11, title: "Debug menu state", completed: true },
      { id: 12, title: "Fix z-index", completed: true },
    ],
    comments: 2,
    attachments: 0,
  },
  {
    id: 5,
    title: "Create project cards component",
    description: "Build reusable project card components with hover effects, progress bars, and team member avatars.",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    projectId: 5,
    project: taskProjects[4],
    assigneeId: 2,
    assignee: taskUsers[1],
    tags: [taskTags[4], taskTags[2]],
    dueDate: "2026-02-08T23:59:59Z",
    estimatedHours: 8,
    completedAt: "2026-02-07T17:00:00Z",
    createdAt: "2026-02-03T10:00:00Z",
    lastModifiedAt: "2026-02-07T17:00:00Z",
    subtasks: [],
    comments: 4,
    attachments: 3,
  },
  {
    id: 6,
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing, building, and deployment to staging and production environments.",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    projectId: 3,
    project: taskProjects[2],
    assigneeId: 5,
    assignee: taskUsers[4],
    tags: [taskTags[1], taskTags[5]],
    dueDate: "2026-02-20T23:59:59Z",
    estimatedHours: 20,
    completedAt: null,
    createdAt: "2026-02-10T08:00:00Z",
    lastModifiedAt: "2026-02-13T14:00:00Z",
    subtasks: [
      { id: 13, title: "Set up test workflow", completed: true },
      { id: 14, title: "Configure build steps", completed: true },
      { id: 15, title: "Add deployment scripts", completed: false },
      { id: 16, title: "Set up environments", completed: false },
    ],
    comments: 6,
    attachments: 2,
  },
  {
    id: 7,
    title: "Research animation libraries",
    description: "Evaluate Framer Motion, React Spring, and GSAP for UI animations. Compare performance, bundle size, and ease of use.",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    projectId: 5,
    project: taskProjects[4],
    assigneeId: 4,
    assignee: taskUsers[3],
    tags: [taskTags[7]],
    dueDate: "2026-02-06T23:59:59Z",
    estimatedHours: 6,
    completedAt: "2026-02-05T16:00:00Z",
    createdAt: "2026-02-02T09:00:00Z",
    lastModifiedAt: "2026-02-05T16:00:00Z",
    subtasks: [],
    comments: 7,
    attachments: 1,
  },
  {
    id: 8,
    title: "Refactor form validation logic",
    description: "Migrate from manual validation to React Hook Form with Zod schema validation for better type safety and DX.",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    projectId: 1,
    project: taskProjects[0],
    assigneeId: 3,
    assignee: taskUsers[2],
    tags: [taskTags[6], taskTags[2]],
    dueDate: "2026-02-22T23:59:59Z",
    estimatedHours: 10,
    completedAt: null,
    createdAt: "2026-02-11T13:00:00Z",
    lastModifiedAt: "2026-02-11T13:00:00Z",
    subtasks: [
      { id: 17, title: "Install dependencies", completed: false },
      { id: 18, title: "Create Zod schemas", completed: false },
      { id: 19, title: "Update form components", completed: false },
    ],
    comments: 1,
    attachments: 0,
  },
  {
    id: 9,
    title: "Design mobile app wireframes",
    description: "Create low-fidelity wireframes for all main screens of the mobile app including navigation flow and user interactions.",
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    projectId: 4,
    project: taskProjects[3],
    assigneeId: 2,
    assignee: taskUsers[1],
    tags: [taskTags[4], taskTags[7]],
    dueDate: "2026-02-25T23:59:59Z",
    estimatedHours: 16,
    completedAt: null,
    createdAt: "2026-02-12T10:00:00Z",
    lastModifiedAt: "2026-02-12T10:00:00Z",
    subtasks: [
      { id: 20, title: "Home screen", completed: false },
      { id: 21, title: "Projects list", completed: false },
      { id: 22, title: "Task details", completed: false },
      { id: 23, title: "Profile settings", completed: false },
    ],
    comments: 0,
    attachments: 0,
  },
  {
    id: 10,
    title: "Optimize database queries",
    description: "Analyze slow queries using EXPLAIN, add appropriate indexes, and implement pagination for large data sets.",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    projectId: 3,
    project: taskProjects[2],
    assigneeId: 1,
    assignee: taskUsers[0],
    tags: [taskTags[2], taskTags[6]],
    dueDate: "2026-02-17T23:59:59Z",
    estimatedHours: 14,
    completedAt: null,
    createdAt: "2026-02-09T11:00:00Z",
    lastModifiedAt: "2026-02-13T10:00:00Z",
    subtasks: [
      { id: 24, title: "Identify slow queries", completed: true },
      { id: 25, title: "Add indexes", completed: true },
      { id: 26, title: "Implement pagination", completed: false },
    ],
    comments: 4,
    attachments: 1,
  },
  {
    id: 11,
    title: "Add dark mode toggle to portfolio",
    description: "Implement a smooth dark/light mode toggle with system preference detection and persistent user preference.",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    projectId: 2,
    project: taskProjects[1],
    assigneeId: 1,
    assignee: taskUsers[0],
    tags: [taskTags[1]],
    dueDate: "2026-02-04T23:59:59Z",
    estimatedHours: 4,
    completedAt: "2026-02-03T14:00:00Z",
    createdAt: "2026-02-01T15:00:00Z",
    lastModifiedAt: "2026-02-03T14:00:00Z",
    subtasks: [],
    comments: 2,
    attachments: 0,
  },
  {
    id: 12,
    title: "Create unit tests for auth service",
    description: "Write comprehensive unit tests for the authentication service covering login, logout, token refresh, and edge cases.",
    status: TaskStatus.CANCELLED,
    priority: TaskPriority.MEDIUM,
    projectId: 3,
    project: taskProjects[2],
    assigneeId: 3,
    assignee: taskUsers[2],
    tags: [taskTags[5]],
    dueDate: "2026-02-12T23:59:59Z",
    estimatedHours: 8,
    completedAt: null,
    createdAt: "2026-02-06T10:00:00Z",
    lastModifiedAt: "2026-02-11T09:00:00Z",
    subtasks: [],
    comments: 3,
    attachments: 0,
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

// ============ TASK API ============

// GET all tasks
export async function getTasks() {
  await delay(500);
  return apiResponse(mockTasks);
}

// GET single task by ID
export async function getTaskById(id) {
  await delay(300);
  const task = mockTasks.find((t) => t.id === id);
  if (!task) {
    throw new Error("Task not found");
  }
  return apiResponse(task);
}

// POST create new task
export async function createTask(taskData) {
  await delay(600);
  const project = taskProjects.find((p) => p.id === taskData.projectId);
  const assignee = taskData.assigneeId ? taskUsers.find((u) => u.id === taskData.assigneeId) : null;
  const tags = taskData.tagIds ? taskTags.filter((t) => taskData.tagIds.includes(t.id)) : [];
  
  const newTask = {
    id: Math.max(...mockTasks.map((t) => t.id)) + 1,
    status: TaskStatus.TODO,
    completedAt: null,
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    subtasks: [],
    comments: 0,
    attachments: 0,
    project,
    assignee,
    tags,
    ...taskData,
  };
  mockTasks = [...mockTasks, newTask];
  return apiResponse(newTask);
}

// PUT update task
export async function updateTask(id, taskData) {
  await delay(500);
  const index = mockTasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error("Task not found");
  }
  
  const project = taskData.projectId 
    ? taskProjects.find((p) => p.id === taskData.projectId) 
    : mockTasks[index].project;
  const assignee = taskData.assigneeId !== undefined
    ? (taskData.assigneeId ? taskUsers.find((u) => u.id === taskData.assigneeId) : null)
    : mockTasks[index].assignee;
  const tags = taskData.tagIds 
    ? taskTags.filter((t) => taskData.tagIds.includes(t.id))
    : mockTasks[index].tags;
  
  const updatedTask = {
    ...mockTasks[index],
    ...taskData,
    project,
    assignee,
    tags,
    lastModifiedAt: new Date().toISOString(),
    completedAt: taskData.status === TaskStatus.COMPLETED && !mockTasks[index].completedAt
      ? new Date().toISOString()
      : mockTasks[index].completedAt,
  };
  mockTasks = mockTasks.map((t) => (t.id === id ? updatedTask : t));
  return apiResponse(updatedTask);
}

// DELETE task
export async function deleteTask(id) {
  await delay(400);
  const index = mockTasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error("Task not found");
  }
  mockTasks = mockTasks.filter((t) => t.id !== id);
  return apiResponse({ deleted: true, id });
}

// Update task status
export async function updateTaskStatus(id, status) {
  return updateTask(id, { status });
}

// Toggle subtask completion
export async function toggleSubtask(taskId, subtaskId) {
  await delay(200);
  const task = mockTasks.find((t) => t.id === taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  
  const updatedSubtasks = task.subtasks.map((st) =>
    st.id === subtaskId ? { ...st, completed: !st.completed } : st
  );
  
  return updateTask(taskId, { subtasks: updatedSubtasks });
}

// Add subtask
export async function addSubtask(taskId, title) {
  await delay(300);
  const task = mockTasks.find((t) => t.id === taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  
  const maxSubtaskId = Math.max(0, ...mockTasks.flatMap((t) => t.subtasks.map((s) => s.id)));
  const newSubtask = {
    id: maxSubtaskId + 1,
    title,
    completed: false,
  };
  
  return updateTask(taskId, { subtasks: [...task.subtasks, newSubtask] });
}

// GET task stats
export async function getTaskStats() {
  await delay(200);
  const stats = {
    total: mockTasks.length,
    todo: mockTasks.filter((t) => t.status === TaskStatus.TODO).length,
    inProgress: mockTasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
    inReview: mockTasks.filter((t) => t.status === TaskStatus.IN_REVIEW).length,
    completed: mockTasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
    cancelled: mockTasks.filter((t) => t.status === TaskStatus.CANCELLED).length,
    overdue: mockTasks.filter((t) => 
      t.status !== TaskStatus.COMPLETED && 
      t.status !== TaskStatus.CANCELLED &&
      new Date(t.dueDate) < new Date()
    ).length,
    byPriority: {
      urgent: mockTasks.filter((t) => t.priority === TaskPriority.URGENT).length,
      high: mockTasks.filter((t) => t.priority === TaskPriority.HIGH).length,
      medium: mockTasks.filter((t) => t.priority === TaskPriority.MEDIUM).length,
      low: mockTasks.filter((t) => t.priority === TaskPriority.LOW).length,
    },
    byProject: taskProjects.map((p) => ({
      id: p.id,
      name: p.name,
      count: mockTasks.filter((t) => t.projectId === p.id).length,
    })),
  };
  return apiResponse(stats);
}

// Export for testing
export { mockTasks };
