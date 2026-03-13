import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { ProtectedRoute } from "@/components/auth/route-guards";
import { Home } from "@/pages/Home";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import ForgotPassword from "@/pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "@/pages/auth/reset-password/ResetPassword";
import { Dashboard } from "@/pages/Dashboard";
import { Members } from "@/pages/users/Members";
import { MemberForm } from "@/pages/users/MemberForm";
import { Roles } from "@/pages/roles/Roles";
import { Projects } from "@/pages/Projects";
import { ProjectForm } from "@/pages/projects/ProjectForm";
import { ProjectDetail } from "@/pages/projects/ProjectDetail";
import { Tasks } from "@/pages/Tasks";
import { TaskForm } from "@/pages/tasks/TaskForm";
import { Profile } from "@/pages/profile/Profile";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Auth-protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />

            {/* Members Routes */}
            <Route path="members">
              <Route index element={<Members />} />
              <Route path="new" element={<MemberForm />} />
              <Route path=":id/edit" element={<MemberForm />} />
            </Route>

            {/* Roles Routes */}
            <Route path="roles">
              <Route index element={<Roles />} />
            </Route>

            {/* Projects Routes */}
            <Route path="projects">
              <Route index element={<Projects />} />
              <Route path=":id" element={<ProjectDetail />} />
              <Route path="new" element={<ProjectForm />} />
              <Route path=":id/edit" element={<ProjectForm />} />
            </Route>

            {/* Tasks Routes */}
            <Route path="tasks">
              <Route index element={<Tasks />} />
              <Route path="new" element={<TaskForm />} />
              <Route path=":id/edit" element={<TaskForm />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
