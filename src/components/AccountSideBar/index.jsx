import React from "react";
import { VscDeviceCamera } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

export default function AccountSideBar({ user }) {
  return (
    <div className="bg-white shadow-md rounded-md sticky top-[10px] w-full">
      {/* Avatar + Name */}
      <div className="w-full px-4 py-6 flex flex-col items-center justify-center">
        <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden mb-4 relative group">
          <img
            src={
              user?.avatar ||
              "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            }
            className="w-full h-full object-cover"
            alt="user-avatar"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-50 flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-95">
            <VscDeviceCamera className="text-white text-[24px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
            />
          </div>
        </div>

        <h3 className="text-center text-sm sm:text-base font-medium">
          {user?.name || "Loading..."}
        </h3>
        <h6 className="text-[10px] sm:text-xs font-[500] text-center text-gray-600">
          {user?.email || ""}
        </h6>
      </div>

      {/* Navigation Links */}
      <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">

        <li className="w-full">
          <NavLink
            to="/my-orders"
            end
            className={({ isActive }) => (isActive ? "isActive" : "")}
          >
            <Button className="!w-full !text-left !justify-start !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 !capitalize">
              <FiBox className="text-[17px]" />
              My Orders
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <Button className="!w-full !text-left !justify-start !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2 !capitalize">
            <IoIosLogOut className="text-[18px]" />
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
}
