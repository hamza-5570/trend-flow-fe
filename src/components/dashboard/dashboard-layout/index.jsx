import Navbar from "@/components/common/nav-bar";
import SideBar from "@/components/common/side-bar";
import withAuth from "@/components/hoc/with-auth";
import { getUser } from "@/lib/helper";
import { useGetuserByIdQuery, useGetuserQuery } from "@/lib/services/auth-api";
import React, { useEffect, useState } from "react";

function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
 const user=getUser()
  const handleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpen(false);
      }
    };

    if (window.innerWidth >= 1024) {
      setOpen(true);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading } = useGetuserByIdQuery(user._id);

  return (
    <div className="flex">
      <SideBar open={open} handleDrawer={handleDrawer} setOpen={setOpen} />
      <div className="flex-1">
        <Navbar data={data} handleDrawer={handleDrawer} open={open} />

        <div className="xl:h-[calc(100vh-82px)] overflow-y-auto pr-5 pl-5 py-5 lg:pr-10 lg:py-8 lg:pl-[100px] xl:pl-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);
