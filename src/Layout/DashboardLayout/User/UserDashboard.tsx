import { useState } from "react";
import { Outlet } from "react-router";

// import UserDrawer from "./aside/UserDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Navbar from "../../../Components/Nav/Navbar";
import Footer from "../../../Components/Footer/FooterSection";
import UserDrawer from "./UserAside/UserDrawer";



const UserDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        <div className="flex flex-col min-h-screen bg-zinc-900 text-yellow-100 font-mono">
    <Navbar />

    {/* Top bar */}
    <div className="flex px-4 py-4 bg-gradient-to-r from-yellow-900 via-amber-800 to-zinc-900 shadow border-b border-yellow-700 items-center">
        {/* Drawer toggle button: visible on small screens */}
        <button
            className="mr-4 text-amber-300 text-2xl lg:hidden hover:text-amber-400 transition duration-200"
            onClick={handleDrawerToggle}
        >
            {drawerOpen ? <IoCloseSharp /> : <FaBars />}
        </button>
        <span className="text-amber-200 text-lg font-bold tracking-wider drop-shadow">
            Welcome to your User Dashboard
        </span>
    </div>

    <div className="flex flex-1">
        {/* Drawer */}
        <aside
            className={`
                fixed top-0 z-40 w-64 bg-zinc-800 border-r border-yellow-700
                ${drawerOpen ? "" : "hidden"} 
                lg:static lg:block lg:w-64
            `}
            style={{ minHeight: "100vh" }}
        >
            <div className="h-full relative">
                {/* Close button for mobile */}
                <button
                    className="absolute top-4 right-4 text-amber-300 text-2xl lg:hidden hover:text-amber-500"
                    onClick={handleDrawerToggle}
                >
                    <IoCloseSharp />
                </button>
                <UserDrawer />
            </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gradient-to-b from-zinc-800 to-zinc-900 p-4 shadow-inner border-l border-yellow-800 min-h-screen">
            <Outlet />
        </main>
    </div>

    <Footer />
</div>

    );
};

export default UserDashboard;