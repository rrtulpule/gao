// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import AddComponent from "./views/UserProfile/AddComponent";
import NodeDashboard from "./views/NodeDashboard/NodeDashboard";
import Billing from "./views/Billing/Billing";
import Receipt from "@material-ui/icons/AddShoppingCart";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
 
  {
    path: "/user",
    name: "Node Management",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/addcomponent",
    name: "Cluster Management",
    icon: BubbleChart,
    component: AddComponent,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Node Details",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },

  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },

  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },

  {
    path: "/billing",
    name: "Billing",
    icon: Receipt,
    component: Billing,
    layout: "/admin"
  }
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
