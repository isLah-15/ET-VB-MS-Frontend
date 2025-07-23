import { Link } from "react-router"
import { adminDrawerData } from "./DrawerData"



const AdminDrawer = () => {
    return (
        <div>

            <h2 className="text-xl font-extrabold text-amber-400 p-4 border-b border-yellow-700 shadow-sm tracking-wide">
                Dashboard Menu
            </h2>
            <ul>
                {
                    adminDrawerData.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={item.link}
                                className="flex items-center space-x-3 border-b-2 border-transparent hover:border-amber-500 hover:bg-amber-700/20 p-4 transition-all duration-200"
                            >
                                <item.icon size={30} />
                                <span className="text-lg text-yellow-100 font-medium">{item.name}</span>
                            </Link>

                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default AdminDrawer