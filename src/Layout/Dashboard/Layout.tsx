"use client";

import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex overflow-hidden">
      <div
        className="fixed inset-0 -z-10 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/Auth/layout_bg.png')" }}
      />
      <div className="fixed bottom-0 right-0 bg-[url('/assets/images/dashboard-bg.png')] bg-no-repeat bg-bottom-right w-full h-full opacity-5 z-0"></div>

      {/* Simple sidebar toggle button, only on mobile, always visible when sidebar is closed */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-40 p-2 rounded-md lg:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          style={{ background: "transparent" }}
        >
          <Menu size={24} className="text-white" />
        </button>
      )}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`h-screen fixed top-0 left-0 z-30 transition-all duration-300 ease-in-out overflow-hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  lg:translate-x-0 lg:z-10 `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="z-10 transition-all duration-300 ease-in-out flex items-center justify-center rounded-t-2xl 2xl:w-[86vw] xl:w-[84vw] lg:w-[80vw] w-full fixed top-0 right-0 overflow-y-auto ">
        <div
          className=" rounded-t-2xl pt-8 p-3 2xl:w-[86vw] xl:w-[84vw] lg:w-[80vw] w-[98vw] overflow-auto   w-full "
          style={{ height: "100vh" }}
        >
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
          {children}
        </div>
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(DashboardLayout), { ssr: false });
