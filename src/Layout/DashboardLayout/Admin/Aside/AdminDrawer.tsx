import { Link } from "react-router"
import { adminDrawerData } from "./DrawerData"



const AdminDrawer = () => {
    return (
  <div className="bg-gradient-to-b from-black via-zinc-900 to-red-950 shadow-inner h-full border-r-4 border-red-700">

    <h2 className="text-2xl font-extrabold text-yellow-400 p-4 border-b-4 border-orange-500 shadow-md tracking-widest uppercase font-horror drop-shadow-lg">
      Dashboard Menu
    </h2>

    <ul className="divide-y divide-orange-900">
      {
        adminDrawerData.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              className="flex items-center space-x-4 p-4 group transition-all duration-200 hover:bg-orange-800/30 hover:pl-6 border-l-4 border-transparent hover:border-yellow-500"
            >
              <item.icon
                size={26}
                // className="text-yellow-300 group-hover:text-orange-400 transition duration-200"
              />
              <span className="text-lg text-white font-semibold tracking-wide group-hover:text-orange-300">
                {item.name}
              </span>
            </Link>
          </li>
        ))
      }
    </ul>

  </div>
);


}

export default AdminDrawer