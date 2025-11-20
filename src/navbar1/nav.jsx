import React, { useState } from "react";
import { faBars, faCartShopping, faHeart, faXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import Logo3 from './../images/logo3.png';
import { Link, useNavigate } from "react-router";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/loginpage");
  };

  const dropdownStyle = {
    position: "absolute",
    top: "35px",
    right: 0,
    background: "#fff",
    border: "1px solid #ccc",
    padding: "10px",
    width: "180px",
    zIndex: 9999,
    borderRadius: "15px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
  };

  return (
    <div>
      <p style={{ textAlign: "center", backgroundColor: "#F2BED1", zIndex: 4000 }}>Free shipping on orders above Rs.999</p>
      <div className="nav row" style={{ position: "relative", zIndex: 3000 }}>
        {/* Logo */}
        <div className="col-md-2 col-4" style={{ textAlign: "baseline" }}>
          <Link to="/" id="head">
            <img id="logo" src={Logo3} alt="logo" width="100px" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="col-8 col-md-10">
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <div className="close-btn" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faXmark} />
            </div>

            <li><Link to="/">Home</Link></li>
            <li><Link to="/productspage">Products</Link></li>
            <li><Link to="/newarrivalspage">New Arrivals</Link></li>
            <li><Link to="/aboutpage">About</Link></li>
            <li><Link to="/contactpage">Contact</Link></li>

            {/* User Dropdown */}
            <div className="icons" style={{ position: "relative" }}>
              <li>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FontAwesomeIcon icon={faCircleUser} />
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>

                {showDropdown && (
                  <div style={dropdownStyle}>
                    {user ? (
                      <>
                        <h6 style={{ textAlign: "center", color: "#dd2c88" }}>Hello, {user.username}</h6>
                        <hr style={{ margin: "5px 0", border: "0.5px solid #ccc" }} />
                        <button
                          onClick={() => { navigate("/orderhistorypage"); setShowDropdown(false); }}
                          style={{ background: "none", border: "none", cursor: "pointer", width: "100%", padding: "5px 0" }}
                        >
                          Order History
                        </button>
                        <hr style={{ margin: "5px 0", border: "0.5px solid #ccc" }} />
                        <button onClick={handleLogout} className="dropbtn">Logout</button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => { navigate("/loginpage"); setShowDropdown(false); }}
                          style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}
                        >
                          Login
                        </button>
                        <hr style={{ margin: "5px 0", border: "0.5px solid #ccc" }} />
                        <button
                          onClick={() => { navigate("/registerpage"); setShowDropdown(false); }}
                          style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}
                        >
                          Register
                        </button>
                      </>
                    )}
                  </div>
                )}
              </li>
            </div>

            <li><Link to="/wishlistpage" className="icons"><FontAwesomeIcon icon={faHeart} /></Link></li>
            <li><Link to="/cartpage" className="icons"><FontAwesomeIcon icon={faCartShopping} /></Link></li>

          </ul>

          {/* Mobile Icons */}
          <ul className="icons-mob">
            <li>
              <div style={{ position: "relative" }} className="iconm">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FontAwesomeIcon icon={faCircleUser} />
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>

                {showDropdown && (
                  <div style={dropdownStyle}>
                    {user ? (
                      <>
                        <h6 style={{ textAlign: "center", color: "#dd2c88" }}>Hello, {user.username}</h6>
                        <hr style={{ margin: "5px 0", border: "0.5px solid #ccc" }} />
                        <button
                          onClick={() => { navigate("/orderhistorypage"); setShowDropdown(false); }}
                          style={{ background: "none", border: "none", cursor: "pointer", width: "100%", padding: "5px 0" }}
                        >
                          Order History
                        </button>
                        <hr style={{ margin: "5px 0", border: "0.5px solid #ccc" }} />
                        <button onClick={handleLogout} className="dropbtn">Logout</button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => { navigate("/loginpage"); setShowDropdown(false); }}
                          style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}
                        >
                          Login
                        </button>
                        <hr style={{ margin: "5px 0", border: "0.5px solid #ccc" }} />
                        <button
                          onClick={() => { navigate("/registerpage"); setShowDropdown(false); }}
                          style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%" }}
                        >
                          Register
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </li>

            <li><Link to="/wishlistpage" className="icons-mob"><FontAwesomeIcon icon={faHeart} /></Link></li>
            <li><Link to="/cartpage" className="icons-mob"><FontAwesomeIcon icon={faCartShopping} /></Link></li>
            <li>
              <div className="menu-icon iconsm" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
