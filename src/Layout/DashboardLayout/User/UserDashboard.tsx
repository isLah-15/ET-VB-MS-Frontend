import { useState } from "react";
import { Outlet, Link } from "react-router";

// import UserDrawer from "./aside/UserDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Navbar from "../../../Components/Nav/Navbar";
import Footer from "../../../Components/Footer/FooterSection";
import UserDrawer from "./UserAside/UserDrawer";
import { userDrawerData } from "./UserAside/UserDrawerData";

const UserDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-yellow-100 font-mono relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                                    radial-gradient(circle at 75% 75%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)`
                }}></div>
            </div>

            <Navbar />

            {/* Enhanced Top bar with modern glassmorphism */}
            <div className="relative z-10 flex px-6 py-5 bg-gradient-to-r from-yellow-900/80 via-amber-800/80 to-zinc-900/80 backdrop-blur-sm shadow-2xl border-b border-yellow-700/50 items-center">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-amber-500/5 to-transparent"></div>
                
                {/* Drawer toggle button with enhanced design */}
                <button
                    className="relative mr-5 p-2 text-amber-300 text-xl lg:hidden hover:text-amber-100 transition-all duration-300 rounded-lg hover:bg-amber-500/20 border border-transparent hover:border-amber-500/30"
                    onClick={handleDrawerToggle}
                >
                    <div className="relative z-10">
                        {drawerOpen ? <IoCloseSharp /> : <FaBars />}
                    </div>
                </button>

                <div className="relative flex items-center gap-3">
                    {/* Welcome indicator */}
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-amber-100 text-xl font-bold tracking-wide drop-shadow-lg">
                        Welcome to your User Dashboard
                    </span>
                </div>
            </div>

            <div className="flex flex-1 relative">
                {/* Enhanced Drawer with modern styling */}
                <aside className={`
                    fixed top-0 z-50 w-72 bg-gradient-to-b from-zinc-800/95 to-zinc-900/95 backdrop-blur-xl border-r border-yellow-700/30 shadow-2xl
                    ${drawerOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:static lg:translate-x-0 lg:w-72 transition-transform duration-300 ease-in-out
                `} style={{ minHeight: "100vh" }}>
                    {/* Drawer glow effect */}
                    <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent"></div>
                    
                    <div className="h-full relative">
                        {/* Enhanced close button for mobile */}
                        <button
                            className="absolute top-6 right-6 p-2 text-amber-300 text-xl lg:hidden hover:text-amber-100 transition-all duration-300 rounded-full hover:bg-amber-500/20 border border-transparent hover:border-amber-500/30 z-10"
                            onClick={handleDrawerToggle}
                        >
                            <IoCloseSharp />
                        </button>

                        {/* Subtle top border accent */}
                        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
                        
                        <UserDrawer />
                    </div>
                </aside>

                {/* Overlay for mobile when drawer is open */}
                {drawerOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                        onClick={handleDrawerToggle}
                    ></div>
                )}

                {/* Enhanced Main content area */}
                <main className="flex-1 bg-gradient-to-br from-zinc-800/50 to-zinc-900/80 backdrop-blur-sm p-6 shadow-inner border-l border-yellow-800/30 min-h-screen relative">
                    {/* Content area subtle pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(45deg, transparent 35%, rgba(251, 191, 36, 0.1) 50%, transparent 65%)`
                        }}></div>
                    </div>

                    {/* Content wrapper with enhanced styling */}
                    <div className="relative z-10 h-full">
                        {/* Subtle top accent */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
                        
                        <div className="pt-4">
                            {/* Quick Action Buttons Section */}
                            <div className="mb-8">
                                <div className="relative mb-6">
                                    <h2 className="text-2xl font-bold text-amber-100 tracking-wide flex items-center gap-3">
                                        <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full"></div>
                                        Quick Actions
                                    </h2>
                                    <div className="absolute -bottom-2 left-0 w-24 h-px bg-gradient-to-r from-yellow-500 to-transparent"></div>
                                </div>

                                {/* Quick Action Buttons Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {userDrawerData.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={item.link}
                                            className="group relative p-6 bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 backdrop-blur-sm rounded-xl border border-yellow-700/20 hover:border-yellow-500/40 shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                                        >
                                            {/* Background glow effect */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Corner accent */}
                                            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-yellow-500/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                                {/* Icon with enhanced styling */}
                                                <div className="p-4 bg-gradient-to-br from-zinc-700/60 to-zinc-800/60 rounded-xl border border-yellow-600/20 group-hover:border-yellow-500/40 group-hover:shadow-lg group-hover:shadow-yellow-500/20 transition-all duration-300">
                                                    <item.icon 
                                                        size={32} 
                                                        className="text-amber-300 group-hover:text-yellow-200 transition-all duration-300 group-hover:scale-110" 
                                                    />
                                                </div>
                                                
                                                {/* Text */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-amber-100 group-hover:text-yellow-100 transition-colors duration-300 mb-1">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                                                        Access {item.name.toLowerCase()}
                                                    </p>
                                                </div>
                                                
                                                {/* Arrow indicator */}
                                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-yellow-400">
                                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Main Content Outlet */}
                            <div className="relative">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent mb-6"></div>
                                <div className="pt-6">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Corner accent elements */}
                    <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-yellow-500/20 rounded-tr-lg"></div>
                    <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-yellow-500/20 rounded-bl-lg"></div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default UserDashboard;