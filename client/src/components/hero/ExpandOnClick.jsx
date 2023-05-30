import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";

const ExpandOnClick = ({ logoutUser }) => {
  return (
    <div className="userIconDiv">
      <Link>
        <RiProfileLine />
        Profile
      </Link>
      <a onClick={logoutUser}>
        <IoMdLogOut />
        Logout
      </a>
    </div>
  );
};

export default ExpandOnClick;
