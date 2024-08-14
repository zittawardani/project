import React, { cloneElement, ReactElement, useState } from "react";
import Navbar from "../navbar";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import Footer from "../footer";
import { ItemDataType } from "@/types/itemsDataTypes";

interface props {
  children: ReactElement;
}

const Appshell = ({ children }: props) => {
  const { pathname } = useRouter();
  const path = ["/user/login", "/user/signup", "/404"]
  const pathProfile = "/user/profile"
  const [items, setItems] = useState<ItemDataType[]>([])

  return (
    <>
      <Toaster />
      {path.includes(pathname) ? (
        <div className="w-full">{children}</div>
      ) : (
        <div className="w-full flex flex-col lg:gap-8 gap-4">
          <div className="w-full border-b shadow-lg sticky top-0 left-0 bg-white z-50">
            <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mx-auto w-full xl:px-0 lg:px-3">
              <Navbar items={items} setItems={setItems} />
            </div>
          </div>

          <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mx-auto w-full xl:px-0 lg:px-3 px-6">
            {children && cloneElement(children, { items, setItems })}
          </div>

          {pathname === pathProfile ? (
            ''
          ) : (
            <div className="w-full border-t">
              <Footer />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Appshell;
