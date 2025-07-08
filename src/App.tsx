import { Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes";
import { Layout } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {appRoutes.map(({ path, element }, index) => (
          <Route
            key={index}
            index={path === "/"}
            path={path === "/" ? undefined : path.replace("/", "")}
            element={element()}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
