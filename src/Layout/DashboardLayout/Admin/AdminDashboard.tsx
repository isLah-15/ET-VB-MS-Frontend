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
  <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-zinc-900 to-red-900 font-sans text-white">
    <Navbar />

    {/* Top bar */}
    <div className="flex px-4 py-4 bg-gradient-to-r from-red-700 via-orange-600 to-yellow-500 items-center border-b-4 border-yellow-400 shadow-md">
      <button
        className="mr-4 text-white text-3xl lg:hidden hover:text-yellow-300 transition-all duration-300"
        onClick={handleDrawerToggle}
      >
        {drawerOpen ? <IoCloseSharp /> : <FaBars />}
      </button>
      <span className="text-xl font-extrabold tracking-widest text-white drop-shadow-sm">
        🎪 Welcome to the Admin Circus
      </span>
    </div>

    <div className="flex flex-1">
      {/* Drawer */}
      <aside
        className={`
          fixed top-0 z-40 w-64 bg-gradient-to-b from-red-800 via-black to-orange-900 text-white border-r-4 border-yellow-500 shadow-lg
          ${drawerOpen ? "" : "hidden"} 
          lg:static lg:block lg:w-64
        `}
        style={{ minHeight: "100vh" }}
      >
        <div className="h-full relative">
          <button
            className="absolute top-4 right-4 text-white text-3xl lg:hidden hover:text-yellow-300 transition-all"
            onClick={handleDrawerToggle}
          >
            <IoCloseSharp />
          </button>
          <AdminDrawer />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gradient-to-b from-black via-zinc-900 to-red-800 min-h-screen p-6 border-l-4 border-yellow-500 shadow-inner text-white">
        <Outlet />
      </main>
    </div>

    <Footer />
  </div>
);


};

export default AdminDashboard;