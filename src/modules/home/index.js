import { asyncComponent } from "commons/components";

const routes = [
  {
    path: "/",
    component: asyncComponent(() => import("./containers/HomePage")),
    exact: true
  }
];

export default routes;
