import { ref } from "vue";

const getInitialTheme = () => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
};

const theme = ref(getInitialTheme());

const applyTheme = (value) => {
  theme.value = value;
  document.documentElement.setAttribute("data-theme", value);
  window.localStorage.setItem("theme", value);
};

const toggleTheme = () => {
  applyTheme(theme.value === "dark" ? "light" : "dark");
};

export function useTheme() {
  return { theme, toggleTheme };
}
