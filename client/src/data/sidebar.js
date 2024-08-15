import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { MdEditSquare } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa6";



const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Warehouse",
    icon: <FaWarehouse />,
    path: "/warehouse"
    ,
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
        icon: <ImProfile/>,
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
        icon: <MdEditSquare />
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
