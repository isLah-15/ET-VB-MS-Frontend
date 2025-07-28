import { Link } from "react-router"
import { userDrawerData } from "./UserDrawerData";

const UserDrawer = () => {
    return (
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 shadow-2xl h-full border-r border-slate-700/50 backdrop-blur-sm">
            {/* Header with subtle glow effect */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl opacity-50"></div>
                <h2 className="relative text-xl font-bold text-white p-6 border-b border-slate-700/70 tracking-wide uppercase bg-slate-800/30 backdrop-blur-sm">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Dashboard Menu
                    </span>
                </h2>
            </div>

            {/* Navigation Items */}
            <nav className="mt-2">
                <ul className="space-y-1 px-3">
                    {userDrawerData.map((item, index) => (
                        <li key={item.id}>
                            <Link
                                to={item.link}
                                className="group relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 hover:shadow-lg hover:shadow-blue-500/10 hover:translate-x-1 border border-transparent hover:border-slate-600/50"
                            >
                                {/* Subtle background pattern */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-slate-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Left accent bar */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full group-hover:h-8 transition-all duration-300 ease-out"></div>
                                
                                {/* Icon with enhanced styling */}
                                <div className="relative z-10 p-2 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                                    <item.icon 
                                        size={20} 
                                        className="text-slate-300 group-hover:text-white transition-all duration-300 group-hover:scale-110" 
                                    />
                                </div>
                                
                                {/* Text with improved typography */}
                                <span className="relative z-10 text-base font-medium text-slate-200 group-hover:text-white tracking-normal transition-all duration-300 group-hover:font-semibold">
                                    {item.name}
                                </span>
                                
                                {/* Subtle arrow indicator */}
                                <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400">
                                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
        </div>
    );
}

export default UserDrawer