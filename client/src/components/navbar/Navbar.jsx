import "./navbar.scss";
import { navLinks } from "../../assets/navLinks";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbarContainer">
        {navLinks.map((links, index) => (
          <div key={index} className="navbar">
            <Link
              to={
                !links.subMenu
                  ? `products/${links.name.replace(/\s+/g, "-").toLowerCase()}`
                  : null
              }
            >
              {links.name}
            </Link>

            <div className="navLinksContainer">
              {links.subMenu && (
                <ul className="navLinks">
                  {links.subLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={`products/${link.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
