import { ISwitchItem } from "react-declarative";

import DashboardPage from "../pages/DashboardPage";
import UserListPage from "../pages/UserListPage";
import UserOnePage from "../pages/UserOnePage";
import UserCardPage from "../pages/UserCardPage";
import UserRecordPage from "../pages/UserRecordPage";

import ErrorPage from "../pages/ErrorPage";

interface IRouteItem extends ISwitchItem {
  sideMenu: string;
}

export const routes: IRouteItem[] = [
  {
    path: "/",
    sideMenu: "root.example_pages.dashboard",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    sideMenu: "root.example_pages.dashboard",
    element: DashboardPage,
  },
  {
    path: "/users_list",
    sideMenu: "root.example_pages.users_list",
    element: UserListPage,
  },
  {
    path: "/users_list/:id",
    sideMenu: "root.example_pages.users_list",
    element: UserOnePage,
  },
  {
    path: "/users_card",
    sideMenu: "root.example_pages.users_card",
    element: UserCardPage,
  },
  {
    path: "/users_card/:id",
    sideMenu: "root.example_pages.users_card",
    element: UserRecordPage,
  },
  {
    path: "/error-page",
    sideMenu: "",
    element: ErrorPage,
  },
  {
    path: "/unauthorized-page",
    sideMenu: "",
    element: ErrorPage,
  },
];

export const sideMenuClickMap: Record<string, string> = {
  "root.example_pages.users_list": "/users_list",
  "root.example_pages.users_card": "/users_card",
  "root.example_pages.dashboard": "/dashboard",
};

export default routes;
