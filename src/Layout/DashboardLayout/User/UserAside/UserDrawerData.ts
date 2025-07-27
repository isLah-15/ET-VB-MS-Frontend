import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaCashRegister } from "react-icons/fa";

export type DrawerData = {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number }>;
    link: string;
}

export const userDrawerData: DrawerData[] = [

    
    
    {
        id: "profile",
        name: "Profile",
        icon: FaUserCheck,
        link: "userprofile"
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
        link: "userevents"
    },
    {
        id: "payments",
        name: "Payments",
        icon: FaCashRegister,
        link: "userpayments"
    }


]
