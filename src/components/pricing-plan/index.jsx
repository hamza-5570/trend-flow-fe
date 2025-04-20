import React from "react";
import Logo from "../ui/logo";
import { IoCheckmark } from "react-icons/io5";
import Link from "next/link";

export default function PricingPlan() {
  return (
    <div className="md:w-[520px] mx-auto flex flex-col items-center px-5 md:px-0 py-8 font-sans">
      <Logo />

      <div className="pt-10">
        <p className="text-xl md:text-2xl text-[#121417] text-center font-bold">
          Subscribe to TrendFlow
        </p>
        <p className="text-base text-[#121417] text-center pt-3">
          Get started with a monthly plan. Pay as you go.
        </p>
      </div>

      <div className="w-full border border-[#DBE0E5] rounded-xl p-3 md:p-5 mt-3">
        <p className="text-base font-bold text-[#121417]">{`AI-Powered Inventory Forecasting $30/month – First Month 50% Off`}</p>

        <div className="flex gap-2 items-center pt-2">
          <p className="text-4xl font-extrabold text-[#121417]">$30</p>
          <p className="text-base text-[#121417] font-bold">/month</p>
        </div>

        <p className="text-sm text-[#0CBA00] pt-2">
          The first month is $15/month
        </p>

        <div className="mt-5">
          <div className="flex items-start gap-2">
            <IoCheckmark size={20} />
            <p className="text-sm text-[#121417] font-bold">
              {`Unlimited SKUs & Forecasts –`}{" "}
              <span className="font-normal">No caps, scale effortlessly.</span>
            </p>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <IoCheckmark size={20} />
            <p className="text-sm text-[#121417] font-bold">
              {`AI-Driven Demand Predictions –`}{" "}
              <span className="font-normal">
                Prevent stockouts & overstock.
              </span>
            </p>
          </div>

          <div className="flex items-start pt-2 gap-2">
            <IoCheckmark size={20} />
            <p className="text-sm text-[#121417] font-bold">
              {`Smart Inventory Alerts –`}{" "}
              <span className="font-normal">
                Get notified before you run out or overbuy.
              </span>
            </p>
          </div>

          <div className="flex items-start pt-2 gap-2">
            <IoCheckmark size={20} />
            <p className="text-sm text-[#121417] font-bold">
              {`Seamless Data Import –`}{" "}
              <span className="font-normal">
                Upload sales & stock data for instant forecasts.
              </span>
            </p>
          </div>

          <div className="flex items-start pt-2 gap-2">
            <IoCheckmark size={20} />
            <p className="text-sm text-[#121417] font-bold">
              {`Automatic SKU Categorization –`}{" "}
              <span className="font-normal">
                AI assigns categories when needed.
              </span>
            </p>
          </div>

          <div className="flex items-start pt-2 gap-2">
            <IoCheckmark size={20} />
            <p className="text-sm text-[#121417] font-bold">
              {`Real-Time Forecast Adjustments –`}{" "}
              <span className="font-normal">
                Smarter predictions as new data comes in.
              </span>
            </p>
          </div>

          <div className="flex items-start pt-2 gap-2">
            <IoCheckmark size={20} />
            <p className="text-sm text-[#121417] font-bold">
              {`Mobile-Friendly Dashboard –`}{" "}
              <span className="font-normal">
                Track inventory anytime, anywhere.
              </span>
            </p>
          </div>
        </div>
      </div>

      <Link href="/payment/card-payment" className="w-full">
        <button className="w-full h-12 bg-black rounded-xl text-white text-sm md:text-base font-bold cursor-pointer mt-5">
          Subscribe now
        </button>
      </Link>

      <p className="text-sm text-[#919191] pt-5 md:pt-8">
        Free refund within the first 7 days.
      </p>
    </div>
  );
}
