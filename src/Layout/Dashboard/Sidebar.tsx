"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  CarFront,
  Package,
  DollarSign,
  MessageSquare,
  User,
  LogOut,
  X,
  Users,
  Phone,
  Truck,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { deleteCookie, getCookie } from "cookies-next";
import darkLogo from "../../../public/Logo/logo-dark.png";
import lightLogo from "../../../public/Logo/logo-light.png";
import { useLogoutHandler } from "@/models/Auth/AuthModel";

type SidebarProps = {
  onClose?: () => void;
};

const Sidebar = ({ onClose }: SidebarProps) => {
  const [sidebarLinks, setSidebarLinks] = useState<
    { name: string; href: string; icon: React.ComponentType }[]
  >([]);

  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(pathname);

  const Loggin = true;
  const role = "Admin";

  const AdminSidebar = [
    { name: "Education", href: "/dashboard", icon: LayoutDashboard },
  ];

  useEffect(() => {
    if (role === "Admin") {
      setSidebarLinks(AdminSidebar);
    } else {
      setSidebarLinks([]);
    }
  }, [Loggin]);

  useEffect(() => {
    if (pathname) {
      const matchedLink = sidebarLinks.find(
        (link) =>
          (pathname.includes(link.href) && link.href !== "/dashboard") ||
          pathname === link.href
      );
      if (matchedLink) {
        setActiveTab(matchedLink.href);
      }
    }
  }, [pathname]);

  const handleTabClick = (href: string) => {
    setActiveTab(href);
    router.push(href);
    if (onClose) onClose();
  };

  const cookiesData = getCookie("lookna_admin")
    ? JSON?.parse(getCookie("lookna_admin") as string)
    : undefined;
  const RefreshToken = cookiesData?.data?.refreshToken;

  // Logout API
  const { Logout } = useLogoutHandler();

  const handleLogout = () => {
    Logout({ refreshToken: RefreshToken, deviceId: "Web" });
  };

  return (
    <aside className="2xl:w-[13vw] xl:w-[15vw] lg:w-[19vw]  h-full max-h-screen p-0 sticky top-0 z-20 overflow-hidden">
      <div className="h-full flex flex-col bg-[var(--glass-bg)] backdrop-blur-md border border-white rounded-xl shadow-lg text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('/dashboard/Frame9.png')] bg-no-repeat bg-cover bg-center z-0 opacity-20 mix-blend-lighten animate-pulse-slow" />

        <div className="relative z-10 px-3 md:px-6 py-6 flex gap-6 items-center justify-between">
          <div
            className="relative w-full flex items-center justify-between"
            onClick={() => router.push("/")}
          >
            <div className="flex flex-col items-center justify-end">
              <h2 className="text-[var(--primary-theme-color)] text-[24px] md:text-[28px] lg:text-[30px] xl:text-[40px] font-bold">
                Lookna
              </h2>
            </div>
            {onClose && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="lg:hidden p-1 rounded-md hover:bg-white/20 flex items-center justify-center transition-all bg-[var(--primary-theme-color)]"
                aria-label="Close sidebar"
              >
                <X size={20} className="text-white" />
              </button>
            )}
          </div>
        </div>

        <div className="relative z-10 flex flex-col h-full overflow-y-auto px-4 py-6">
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
            /* Hide scrollbar for IE, Edge and Firefox */
            div {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
          `}</style>
          <div className="flex flex-col gap-2">
            <nav className="flex-1 flex flex-col gap-3">
              {sidebarLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleTabClick(link.href)}
                  className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 cursor-pointer  
                                ${
                                  activeTab === link.href ||
                                  (link.href !== "/dashboard" &&
                                    pathname.includes(link.href))
                                    ? "bg-[var(--primary-theme-color)] text-white font-medium shadow-md"
                                    : "text-gray-400 hover:bg-white/10 hover:text-white hover:shadow-sm"
                                }

                                `}
                >
                  <LayoutDashboard size={14} />
                  <span className="text-sm font-medium">{link.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-4">
            <button
              onClick={handleLogout}
              className="flex cursor-pointer w-full items-center gap-3 p-3 rounded-lg text-gray-400 bg-white/10 text-white hover:shadow-sm hover:bg-[var(--primary-theme-color)] hover:text-white font-medium shadow-md"
            >
              <LogOut size={20} className="text-white" />
              <span className="text-sm font-medium">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false });
