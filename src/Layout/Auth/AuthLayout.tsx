import Image, { StaticImageData } from "next/image";
import React, { JSX, ReactNode } from "react";

interface Authlayout {
  children: ReactNode;
}

const AuthLayout = ({ children }: Authlayout): JSX.Element => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-layoutDarkBG bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/Auth/layout_bg.png')" }}
    >
      <div
        className="flex flex-col items-center w-full"
        style={{ height: "100%" }}
      >
        <div className="flex-1 flex flex-col justify-center items-center min-h-0 w-full">
          <div className="flex flex-col items-center justify-center pb-4">
            <h2 className="text-[var(--primary-theme-color)] text-[24px] md:text-[28px] lg:text-[30px] xl:text-[60px] font-bold">
              Lookna
            </h2>
            <div className="flex gap-2">
              <h3
                className="text-[14px] md:text-[18px] lg:text-[30px] xl:text-[30px] font-bold"
                style={{ fontFamily: "var(--font-atmospheric)" }}
              >
                Find Your{" "}
              </h3>
              <div className="relative inline-flex items-center align-middle">
                <img
                  src="/Auth/eclipse.png"
                  alt="eclipse"
                  className="absolute left-1/2 top-1/2 w-[80%] h-[80%] md:w-[110%] md:h-[110%] lg:w-[140%] lg:h-[140%] -translate-x-1/2 -translate-y-1/2 object-cover z-0 pointer-events-none opacity-80"
                />
                <h3
                  className="relative z-10 text-[var(--primary-theme-color)] text-[14px] md:text-[18px] lg:text-[30px] xl:text-[30px] font-[var(--font-atmospheric)] font-bold"
                  style={{ fontFamily: "var(--font-atmospheric)" }}
                >
                  Ideal Investment
                </h3>
              </div>
              <h3
                className="text-[14px] md:text-[18px] lg:text-[30px] xl:text-[30px] font-bold"
                style={{ fontFamily: "var(--font-atmospheric)" }}
              >
                Vault
              </h3>
            </div>
            <img
              src="/Auth/Line.png"
              alt="line"
              className="mx-auto py-4 w-[50vw]"
            />
          </div>
          <div className="w-full xl:px-0 px-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
