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
import { Error404 } from "@components/Error404/Error404.tsx";
import { FifaRanking } from "@components/FIFA Ranking/Ranking.tsx";
import { CompareTeams } from "@components/Pages/CompareTeams/CompareTeams.tsx";
import { ComparePlayers } from "@components/Pages/ComparePlayers/ComparePlayers.tsx";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path={routes.team} element={<TeamView />} />
        <Route path={routes.compareTeams} element={<CompareTeams />} />
        <Route path={routes.comparePlayers} element={<ComparePlayers />} />
        <Route path={routes.ranking} element={<FifaRanking />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
