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
  selectIsLoggedIn,
  selectUserId,
  selectUserName,
} from "../../redux/slice/authSlice";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import ExpandOnClick from "./ExpandOnClick";
import { toast } from "react-toastify";
import { useComponentHideAndShow } from "../../hooks/useComponentHideAndShow";
import Cart from "../cart/Cart";
import { selectCartProducts } from "../../redux/slice/cartSlice";

const Hero = () => {
  // listening for scroll direction(up/down), if scrolling down then hiding the navbar and if scrolling up then showing the navbar
  const scrollDirection = useScrollDirection("down");

  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDataCollection = useFirestoreCollection("users-name");

  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { ref } = useComponentHideAndShow(setOpen);

  const currentUserId = useSelector(selectUserId);
  const cartProducts = useSelector(selectCartProducts);

  const cartProductsForCurrentUser = cartProducts?.filter(
    (products) => products.userId === currentUserId
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const filteredUser = userDataCollection.data.filter(
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
  }, [auth, dispatch, currentUserName, userDataCollection.data]);

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

  //the hook created for hiding and showing components didn't work so had to do it manually. This is done to hide  the cart component when the user click outside of the cart component
  const cartRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [cartRef, setOpen]);

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

              <li ref={cartRef} className="cart">
                <IconContext.Provider
                  value={{ style: { color: "#FDFDFD", fontSize: "45px" } }}
                >
                  <Link onClick={() => setCartOpen(!cartOpen)}>
                    <FaCartArrowDown />
                    <span className="quantityCount">
                      {cartProductsForCurrentUser?.length}
                    </span>
                  </Link>
                </IconContext.Provider>
                {cartOpen && <Cart />}
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
