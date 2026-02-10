import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Dashboard } from "@/pages/Dashboard";
import { Members } from "@/pages/Members";
import { Tasks } from "@/pages/Tasks";
import Projects from "@/pages/Projects";

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
        <Route path="/members" element={<Layout />}>
          <Route index element={<Members />} />
        </Route>
        <Route path="/projects" element={<Layout />}>
          <Route index element={<Projects />} />
        </Route>
        <Route path="/tasks" element={<Layout />}>
          <Route index element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
