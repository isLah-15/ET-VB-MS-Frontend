import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

export type DrawerData = {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number }>;
    link: string;
}

export const adminDrawerData: DrawerData[] = [

    
    {
        id: "users",
        name: "Users",
        icon: FiUsers,
        link: "users"
    },
    {
        id: "profile",
        name: "Profile",
        icon: FaUserCheck,
        link: "profile"
    },
    {
        id: "analytics",
        name: "Analytics",
        icon: TbBrandGoogleAnalytics,
        link: "analytics"
    },
    {
        id: "events",
        name: "Events",
        icon: SlCalender,
        link: "events"
    },

]
