import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="light" storageKey="team-nest-theme">
    <App />
    <Toaster />
  </ThemeProvider>
);
