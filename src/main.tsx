import ReactDOM from "react-dom/client";
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./styles/global.scss";
import App from "./App.tsx";
import Layout from "./Layout/Layout.tsx";
import { routes } from "./routes.ts";
import { TeamView } from "@components/TeamView/TeamView.tsx";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path={routes.team} element={<TeamView />} />
      </Route>
    </Route>
  )
);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
