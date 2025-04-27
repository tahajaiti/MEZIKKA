import { DoorOpen, Users, BarChart, Shield, Tag, Disc } from "lucide-react";
import { useState } from "react";
import MezikkaText from "../Texts/MezikkaText";
import { Link } from "react-router";
import { logout } from "../../stores/authStore";
import { useLogout } from "../../api/services/auth/query";

const AdminHeader = () => {
    const { mutate } = useLogout();
    const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

    const handleLogout = () => {
        mutate(undefined, {
            onSuccess: () => {
                logout();
            },
            onError: (error) => {
                console.error("Logout error:", error);
            },
        });
    };

    const toggleAdminMenu = () => {
        setIsAdminMenuOpen(!isAdminMenuOpen);
    };

    const adminNavItems = [
        { icon: <Users className="w-4 h-4" />, label: "Users", path: "/admin/users" },
        { icon: <Tag className="w-4 h-4" />, label: "Genres", path: "/admin/genres" },
        { icon: <Disc className="w-4 h-4" />, label: "Songs", path: "/admin/songs" },
        { icon: <BarChart className="w-4 h-4" />, label: "Statistics", path: "/admin/Statistics" },
    ];

    return (
        <header className="sticky top-0 flex justify-between items-center px-3 sm:px-4 md:px-8 lg:px-16 py-2 sm:py-3 z-50 w-full bg-zinc-900/80 backdrop-blur-md">
            <div className="flex items-center">
                <div className="flex items-center gap-2">
                    <div className="w-auto">
                        <MezikkaText />
                    </div>
                    <span className="py-1 px-2 sm:py-1.5 sm:px-3 bg-red-600 shadow-xl shadow-red-500/20 
                        rounded-full font-medium text-xs sm:text-sm transition-colors">ADMIN</span>
                </div>
            </div>

            <div className="hidden md:flex flex-1 justify-center items-center mr-0 lg:mr-40 xl:mr-72">
                <div className="flex space-x-3 lg:space-x-6">
                    {adminNavItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="flex items-center gap-1 lg:gap-2 text-zinc-300 hover:text-white transition-colors text-sm lg:text-base"
                        >
                            <span className="hidden sm:block">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex ml-auto items-center gap-1 xs:gap-2 sm:gap-4">
                <div className="relative md:hidden">
                    <button
                        onClick={toggleAdminMenu}
                        className="p-1 sm:p-1.5 bg-red-800/50 hover:bg-red-700 rounded-full transition-all cursor-pointer"
                        aria-label="Admin menu"
                    >
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {isAdminMenuOpen && (
                        <div className="absolute right-0 mt-2 w-36 sm:w-48 bg-zinc-800 rounded-sm shadow-lg py-1 z-50 border border-zinc-700">
                            {adminNavItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-zinc-300 hover:bg-zinc-700"
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-transparent p-1 sm:p-1.5 md:p-2 hover:bg-zinc-500/40 rounded-full transition-all cursor-pointer"
                    aria-label="Logout"
                >
                    <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shadow-xl shadow-red-500" />
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;