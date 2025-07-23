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
    <div className="flex flex-col min-h-screen bg-zinc-900 font-mono text-yellow-100">
        <Navbar />

        {/* Top bar */}
        <div className="flex px-4 py-4 bg-gradient-to-r from-yellow-900 via-amber-800 to-zinc-900 items-center border-b border-yellow-700 shadow-md">
            {/* Drawer toggle button: visible on small screens */}
            <button
                className="mr-4 text-yellow-100 text-2xl lg:hidden"
                onClick={handleDrawerToggle}
            >
                {drawerOpen ? <IoCloseSharp /> : <FaBars />}
            </button>
            <span className="text-lg font-bold drop-shadow text-amber-300">
                Welcome to your Admin dashboard
            </span>
        </div>

        <div className="flex flex-1">
            {/* Drawer */}
            <aside
                className={`
                    fixed top-0 z-40 w-64 bg-zinc-800 text-yellow-100 shadow-2xl border-r border-yellow-700
                    ${drawerOpen ? "" : "hidden"} 
                    lg:static lg:block lg:w-64
                `}
                style={{ minHeight: "100vh" }}
            >
                <div className="h-full relative">
                    {/* Close button for mobile */}
                    <button
                        className="absolute top-4 right-4 text-amber-300 text-2xl lg:hidden"
                        onClick={handleDrawerToggle}
                    >
                        <IoCloseSharp />
                    </button>
                    <AdminDrawer />
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-zinc-900 min-h-screen p-4 border-l border-yellow-800 shadow-inner">
                <Outlet />
            </main>
        </div>

        <Footer />
    </div>
);

};

export default AdminDashboard;