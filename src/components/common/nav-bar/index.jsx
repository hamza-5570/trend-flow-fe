import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UpdateNotify from "@/components/UpdateNotify";
import {
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
} from "@/lib/services/alerts-api";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "sonner";

export default function Navbar({ handleDrawer, open, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [routeName, setRouteName] = useState("");
  const { data: notification, isLoading } = useGetNotificationsQuery();


  useEffect(() => {
    if (router.isReady) {
      const pathSegments = router.pathname.split("/").filter(Boolean);

      if (pathSegments[0] === "dashboard") {
        if (pathSegments.length === 1) {
          setRouteName("Dashboard");
        } else {
          const formattedName = pathSegments[1]
            .split("-")
            ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          setRouteName(formattedName);
        }
      }
    }
  }, [router.isReady, router.pathname]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

 

  const handlelogout = async () => {
    localStorage.clear();
    setIsOpen(false);
    await router.push("/auth/log-in");
    toast.success("Logout Successfully");
  };

  return (
    <div className="h-[70px] md:h-[82px] flex items-center justify-between shadow-md shadow-[#0000000D] pr-5 pl-5 py-5 lg:pr-8 lg:py-8 lg:pl-[100px] xl:pl-8">
      <Image
        src={"/assets/svg/left-arrow.svg"}
        alt=""
        width={30}
        height={30}
        onClick={handleDrawer}
        className={`fixed z-50 top-5 w-12 cursor-pointer lg:block hidden ${
          open ? "left-[235px]" : "left-2"
        }`}
      />
      <p className="text-xl md:text-[28px] text-[#17191B] font-semibold">
        {routeName}
      </p>

      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-[223px] h-12 border border-[#EEEEEE] rounded-full text-sm placeholder:text-[#A1A4A9] ps-12 pr-5"
          />
          <Image
            src={"/assets/svg/search-icon.svg"}
            alt=""
            width={22}
            height={22}
            className="absolute top-3 left-4"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <button variant="outline">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#EEEEEE]">
                <div className="relative">
                  <BiBell size={22} />
                  <div className="absolute -top-1 -right-1 w-[14px] h-[14px] flex items-center justify-center rounded-full bg-black text-white text-[10px]">
                    {
                      notification?.filter((item) => item?.isread === false)
                        ?.length
                    }
                  </div>
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Notifications</h4>
                <ul className="overflow-y-auto max-h-[300px] ">
                  {notification?.map((notification) => (
                    <>
                      <li
                        key={notification?.id}
                        className="my-3 pb-1 flex gap-x-2 items-center border-b"
                      >
                        <div className="w-[30px] h-[30px] rounded-full bg-[#D9D9D9] text-black text-sm mr-2"></div>
                        <p className="text-xs w-[60%] text-grey ">
                          {notification?.message}
                        </p>
                        <p className="text-[10px] w-[15%] text-[#7A7E83]">
                          {" "}
                          {new Date(notification?.createdAt).getHours()} hours
                          ago
                        </p>
                        <UpdateNotify notification={notification}/>
                       
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div
          className="relative w-[206px] hidden md:block cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="h-12 flex items-center justify-between rounded-full border border-[#EEEEEE] pl-2 pr-3">
            <div className="flex gap-2">
              <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#D9D9D9] text-black text-sm">
                {data?.data?.name
                  .split(" ")
                  ?.map((word) => word.charAt(0))
                  .join("")}
              </div>
              <div>
                <p className="text-xs text-black">{data?.data?.name}</p>
                <p className="text-xs text-[#7A7E83]">
                  {data?.data?.role === "user" ? "User" : "Admin"}
                </p>
              </div>
            </div>
            <IoIosArrowDown size={14} className="cursor-pointer" />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-full bg-white border border-[#EEEEEE] rounded-lg shadow-lg z-10">
              <ul className="text-sm text-black">
                <li className="p-2 hover:bg-gray-100 cursor-pointer border-b border-[#EEEEEE]">
                  Settings
                </li>
                <li
                  onClick={handlelogout}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        <Image
          src={"/assets/svg/left-arrow.svg"}
          alt=""
          width={30}
          height={30}
          onClick={handleDrawer}
          className="cursor-pointer w-12 rotate-180 block lg:hidden"
        />
      </div>
    </div>
  );
}
