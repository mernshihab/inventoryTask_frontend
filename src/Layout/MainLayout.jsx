import { Link, Outlet } from "react-router-dom";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/categories">Categories</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
