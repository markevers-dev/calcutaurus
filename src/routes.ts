import Home from "./pages/home";
import BaseConverter from "./pages/base-converter";

export const appRoutes = [
  { path: "/", label: "Home", element: Home },
  {
    path: "/base-converter",
    label: "Base Number Converter",
    element: BaseConverter,
  },
];
