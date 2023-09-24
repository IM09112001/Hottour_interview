import { IScaffold2Group } from "react-declarative";

import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";

export const sidemenu: IScaffold2Group[] = [
  {
        id: "example_pages",
    label: "Example Pages",
    icon: PublicIcon,
    children: [
      {
        label: "Dashboard",
        id: "dashboard",
        icon: HomeIcon,
        
      },
      {
        label: "Form generator app",
        id: "users_list",
        icon: PlaylistAddCheckIcon,
      },
      // {
      //   label: "Another form generator",
      //   id: "users_card",
      //   icon: PlaylistAddCheckIcon,
      // },
    ],
  },
];

export default sidemenu;
