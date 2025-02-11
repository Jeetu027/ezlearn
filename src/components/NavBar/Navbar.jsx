import React, { useState, useRef, useEffect } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const activeBarRef = useRef(null);

  const navItems = [
    { name: "Home", route: "/" },
    { name: "Discover Course", route: "/courses" },
    { name: "My Course", route: "/mycourses" },
  ];

  // State for active navigation item
  const [active, setActive] = useState(() => {
    const currentNavItem = navItems.find(
      (item) => item.route === location.pathname
    );
    return currentNavItem ? currentNavItem.name : null;
  });

  // Synchronize active state with location changes
  useEffect(() => {
    const currentNavItem = navItems.find(
      (item) => item.route === location.pathname
    );
    setActive(currentNavItem ? currentNavItem.name : null);
  }, [location.pathname]);

  // Update active bar position
  useEffect(() => {
    const UpdateActivebar = () => {
      const activeElement = document.querySelector(`[data-name="${active}"]`);
      if (activeElement && activeBarRef.current) {
        activeBarRef.current.style.width = `${activeElement.offsetWidth + 40}px`;
        activeBarRef.current.style.height = `${
          activeElement.offsetHeight + 20
        }px`;
        activeBarRef.current.style.left = `${activeElement.offsetLeft - 20}px`;
        activeBarRef.current.style.top = `${activeElement.offsetTop - 10}px`;
      }
    };

    // Ensure the active bar updates after the DOM renders
    const timeout = setTimeout(UpdateActivebar, 50);

    return () => clearTimeout(timeout);
  }, [active, location.pathname]);

  return (
    <div className="Navbar d-flex justify-content-between align-items-center">
      <div className="Logo">
        <img src="/Images/Atmiya.png" alt="Logo" />
      </div>
      <div className="Navitems d-flex gap-5 position-relative align-items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            data-name={item.name}
            to={item.route}
            className={`m-0 z-1 ${
              active === item.name ? "text-white" : ""
            } link2`}
            onClick={() => setActive(item.name)}
          >
            {item.name}
          </Link>
        ))}
        {/* Render active bar only if active is not null */}
        {active && <div className="activebar" ref={activeBarRef}></div>}
      </div>
      <div className="Profile">Profile</div>
    </div>
  );
}

export default Navbar;
