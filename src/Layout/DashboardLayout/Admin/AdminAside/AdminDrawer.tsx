import { Link } from "react-router"
import { adminDrawerData } from "./DrawerData"



const AdminDrawer = () => {
    return (
  <div className="bg-neutral-900 shadow-inner h-full border-r border-neutral-800">

    <h2 className="text-xl font-bold text-white p-4 border-b border-neutral-700 tracking-wide uppercase">
      Dashboard Menu
    </h2>

    <ul className="divide-y divide-neutral-800">
      {
        adminDrawerData.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              className="flex items-center space-x-4 p-4 group transition duration-150 hover:bg-neutral-800 hover:pl-6 border-l-4 border-transparent hover:border-neutral-500"
            >
              <item.icon size={22} className="text-white group-hover:text-neutral-300 transition" />
              <span className="text-base font-medium text-white group-hover:text-neutral-300 tracking-normal">
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