import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Dashboard } from "@/pages/Dashboard";
import { Members } from "@/pages/users/Members";
import { MemberForm } from "@/pages/users/MemberForm";
import { Roles } from "@/pages/users/Roles";
import { Projects } from "@/pages/Projects";
import { ProjectForm } from "@/pages/projects/ProjectForm";
import { Tasks } from "@/pages/Tasks";
import { TaskForm } from "@/pages/tasks/TaskForm";
import { Profile } from "@/pages/Profile";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* App Routes with Layout */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/profile" element={<Layout />}>
          <Route index element={<Profile />} />
        </Route>
        
        {/* Members Routes */}
        <Route path="/members" element={<Layout />}>
          <Route index element={<Members />} />
          <Route path="new" element={<MemberForm />} />
          <Route path=":id/edit" element={<MemberForm />} />
        </Route>
        
        {/* Roles Routes */}
        <Route path="/roles" element={<Layout />}>
          <Route index element={<Roles />} />
        </Route>
        
        {/* Projects Routes */}
        <Route path="/projects" element={<Layout />}>
          <Route index element={<Projects />} />
          <Route path="new" element={<ProjectForm />} />
          <Route path=":id/edit" element={<ProjectForm />} />
        </Route>
        
        {/* Tasks Routes */}
        <Route path="/tasks" element={<Layout />}>
          <Route index element={<Tasks />} />
          <Route path="new" element={<TaskForm />} />
          <Route path=":id/edit" element={<TaskForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
