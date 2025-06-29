import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "./MainLayout.css";
import { FaBars } from "react-icons/fa";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="layout-container">
      <div className="mobile-header">
        <FaBars onClick={toggleSidebar} className="hamburger-icon" />
        <h2 className="mobile-title">Inventory App</h2>
      </div>

      <aside className={`sidebar ${showSidebar ? "show" : ""}`}>
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="nav-links">
          <Link to="/" onClick={() => setShowSidebar(false)}>Products</Link>
          <Link to="/categories" onClick={() => setShowSidebar(false)}>Categories</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
