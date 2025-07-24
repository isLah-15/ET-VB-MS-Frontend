import { useState } from "react";
import Navbar from "../../../Components/Nav/Navbar";
import { IoCloseSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import AdminDrawer from "./Aside/AdminDrawer";
import { Outlet } from "react-router";
import Footer from "../../../Components/Footer/FooterSection";


const AdminDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
  <div className="flex flex-col min-h-screen bg-neutral-950 font-sans text-white">
    <Navbar />

    {/* Top bar */}
    <div className="flex px-4 py-4 bg-neutral-900 items-center border-b border-neutral-700 shadow-sm">
      <button
        className="mr-4 text-white text-2xl lg:hidden hover:text-neutral-300 transition"
        onClick={handleDrawerToggle}
      >
        {drawerOpen ? <IoCloseSharp /> : <FaBars />}
      </button>
      <span className="text-xl font-bold tracking-wide text-white">
         Admin Dashboard
      </span>
    </div>

    <div className="flex flex-1">
      {/* Drawer */}
      <aside
        className={`
          fixed top-0 z-40 w-64 bg-neutral-900 text-white border-r border-neutral-800 shadow-sm
          ${drawerOpen ? "" : "hidden"} 
          lg:static lg:block lg:w-64
        `}
        style={{ minHeight: "100vh" }}
      >
        <div className="h-full relative">
          <button
            className="absolute top-4 right-4 text-white text-2xl lg:hidden hover:text-neutral-400 transition"
            onClick={handleDrawerToggle}
          >
            <IoCloseSharp />
          </button>
          <AdminDrawer />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-neutral-950 min-h-screen p-6 border-l border-neutral-800 shadow-inner text-white">
        <Outlet />
      </main>
    </div>

    <Footer />
  </div>
);

};

export default AdminDashboard;