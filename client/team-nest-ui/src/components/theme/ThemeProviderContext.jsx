import { createContext } from "react";

const ThemeProviderContext = createContext({
  theme: "light",
  setTheme: () => null,
});

export default ThemeProviderContext;
