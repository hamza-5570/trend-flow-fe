import Image from "next/image";
import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen overflow-y-auto h-full">
      <div className="bg-black place-content-center lg:rounded-r-3xl">
        <div className="xl:w-[525px] mx-auto px-5 xl:px-0 pb-5">
          <p className="md:w-[80%] lg:w-full text-xl md:text-3xl font-bold text-white pt-32 md:pt-10 lg:pt-16">
            Smart Inventory. Bigger Profits
          </p>

          <div className="pt-5 md:pt-16">
            <p className="text-lg/relaxed md:text-2xl/relaxed font-medium text-white">
              AI-Powered Forecasting Build for Small Fashion Brands
            </p>

            <p className="text-sm/relaxed md:text-base/relaxed text-white pt-3 md:pt-6">
              Every inventory mistake costs you. Stockouts mean missed sales.
              Overstock ties up cash and eats into profits.
            </p>

            <p className="text-sm/relaxed md:text-base/relaxed text-white pt-5 md:pt-14">
              TrendFlow keeps your inventory balanced with just the right amount
              of stock
            </p>

            <div className="pt-5">
              <p className="text-sm md:text-base text-white">
                ✅ Keep your bestsellers in stock
              </p>

              <p className="text-sm md:text-base text-white pt-1">
                ✅ Avoid overordering and reduce storage
              </p>
              <p className="text-sm md:text-base text-white pt-1">
                ✅ Predict demand with AI-powered sales forecasting
              </p>
              <p className="text-sm md:text-base text-white pt-1">
                ✅ Enterprise-level forecasting at a small business price
              </p>
            </div>

            <p className="text-xl md:text-[27px] text-white pt-10 md:pt-16">
               Start optimizing your inventory today.
            </p>
          </div>
        </div>
      </div>
      <div className="place-content-center pt-10 lg:pt-20 pb-5 lg:pb-0">
        <Image
          src={"/assets/png/logo.png"}
          width={432}
          height={297}
          alt="logo"
          className="w-[108px] absolute left-1/2 md:left-full -translate-x-1/2 md:-translate-x-32 top-5"
        />

        <div className="md:w-[427px] mx-auto px-5 md:px-0">{children}</div>
      </div>
    </div>
  );
}
