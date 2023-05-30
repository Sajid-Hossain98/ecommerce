import "./hero.scss";
import { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { GoSearch } from "react-icons/go";
import { MdOutlineBuildCircle, MdOutlineSettingsSuggest } from "react-icons/md";
import {
  RiUserFill,
  RiAccountPinCircleLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import { FaCartArrowDown, FaIdeal } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import useScrollDirection from "../../hooks/useScrollDirection";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
  selectEmail,
  selectIsLoggedIn,
  selectUserName,
} from "../../redux/slice/authSlice";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import ExpandOnClick from "./ExpandOnClick";
import { toast } from "react-toastify";
import { useComponentHideAndShow } from "../../hooks/useComponentHideAndShow";

const Hero = () => {
  // listening for scroll direction(up/down), if scrolling down then hiding the navbar and if scrolling up then showing the navbar
  const scrollDirection = useScrollDirection("down");

  const [open, setOpen] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersName = useFirestoreCollection("users-name");

  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const filteredUser = usersName.data.filter(
          (data) => user.email === data.email
        );

        filteredUser.map((data) =>
          setCurrentUserName(`${data.firstName} ${data.lastName}`)
        );

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userId: user.uid,
            userName: currentUserName,
          })
        );
      } else {
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, currentUserName, usersName.data]);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully! ");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const { ref } = useComponentHideAndShow(setOpen);

  return (
    <>
      {/* implementing the header section with logo, searchBar and other links */}
      <div className={`sticky ${scrollDirection === "down" ? "hide" : "show"}`}>
        <div className="heroContainer">
          <div className="content">
            <div className="logo">
              <Link to="/">
                <img src="https://i.ibb.co/D7wG0Kq/store-Logo.png" alt="logo" />
              </Link>
            </div>

            <div className="admin">
              <Link to="/admin">
                <GrUserAdmin />
                <span>Admin</span>
              </Link>{" "}
            </div>

            <div className="search">
              <input type="text" name="search" placeholder="search" />

              <GoSearch className="search-icon" />
            </div>

            <ul className="options">
              <li>
                <Link>
                  <MdOutlineSettingsSuggest />
                  <span>Custom PC</span>
                </Link>
              </li>

              <li>
                <Link>
                  <FaIdeal />
                  <span>Today's Deals</span>
                </Link>
              </li>

              <li>
                <Link>
                  <MdOutlineBuildCircle />
                  <span>Builder</span>
                </Link>
              </li>

              <li ref={ref}>
                {isLoggedIn ? (
                  <>
                    <div className="userName" onClick={() => setOpen(!open)}>
                      <RiUserFill />
                      <span>
                        {userName.length > 20
                          ? userName.slice(0, 20)
                          : userName}
                      </span>
                      {open ? (
                        <RiArrowDownSLine style={{ color: "#fda500" }} />
                      ) : (
                        <RiArrowRightSLine />
                      )}

                      {open ? <ExpandOnClick logoutUser={logoutUser} /> : null}
                    </div>
                  </>
                ) : (
                  <div className="account">
                    <div className="nameIcon">
                      <RiAccountPinCircleLine />
                      <span>Account</span>
                    </div>
                    <div className="loginOrRegister">
                      <Link to="/register">Register</Link>
                      or
                      <Link to="/login">Login</Link>
                    </div>
                  </div>
                )}
              </li>

              <li>
                <IconContext.Provider
                  value={{ style: { color: "#FDFDFD", fontSize: "45px" } }}
                >
                  <Link>
                    <FaCartArrowDown />
                    <span>0</span>
                  </Link>
                </IconContext.Provider>
              </li>
            </ul>
          </div>
        </div>

        {/* importing the navbar component */}
        <Navbar />
      </div>
    </>
  );
};

export default Hero;
