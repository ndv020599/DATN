import { Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";
import Users from "./components/Users/Users";
import Category from "./components/Category/Category";
import Book from "./components/Book/Book";
import BookRequest from "./components/BookRequest/bookRequest";
import ListBookRequest from "./components/ListBookRequest/ListBookRequest";
import BookRequestOfUser from "./components/BookRequestOfUser/BookRequestOfUser";
import ListReturnBookRequest from "./components/ListReturnBookRequest/ListReturnBookRequest";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import Staff from "./components/Staff/Staff";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const rootRoutes = [
  // { path: '', component: HomePage, icon: HomeIcon, name: 'Trang Chủ' },
  // O: USER
  // 1: ADMIN
  // 2: THU THU
  // 3: CBGV
  {
    path: "home",
    component: HomePage,
    icon: HomeRoundedIcon,
    name: "Trang Chủ",
    role: [0, 1, 2, 3],
  },
  {
    path: "profile",
    component: Profile,
    icon: AccountCircleRoundedIcon,
    name: "Hồ sơ",
    role: [0, 1, 2, 3],
  },
  {
    path: "users",
    component: Users,
    icon: ManageAccountsIcon,
    name: "Quản lý người dùng",
    role: [1],
  },
  {
    path: "staff",
    component: Staff,
    icon: GroupIcon,
    name: "Quản lý nhân viên",
    role: [1],
  },
  {
    path: "category",
    component: Category,
    icon: MenuBookIcon,
    name: "Thể loại",
    role: [1, 2],
  },
  {
    path: "book",
    component: Book,
    icon: MenuBookIcon,
    name: "Quản lý sách",
    role: [1, 2],
  },
  {
    path: "bookRequest",
    component: BookRequest,
    icon: MenuBookIcon,
    name: "Danh sách Sách",
    role: [0, 3],
  },
  {
    path: "listBorrowBookRequest",
    component: ListBookRequest,
    icon: MenuBookIcon,
    name: "Quản lý sách mượn",
    role: [1, 2],
  },
  {
    path: "listReturnBookRequest",
    component: ListReturnBookRequest,
    icon: MenuBookIcon,
    name: "Quản lý sách trả",
    role: [1, 2],
  },
  {
    path: "bookRequestOfUser",
    component: BookRequestOfUser,
    icon: MenuBookIcon,
    name: "Danh sách Mượn",
    role: [0, 3],
  },
];
