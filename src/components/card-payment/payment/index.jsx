import Loader from "@/components/common/loader";
import { useLazyGetuserByIdQuery } from "@/lib/services/auth-api";
import { CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";

export default function Payment({ handleSumbit, isLoading }) {
  const [selectedOption, setSelectedOption] = useState("Card");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  return (
    <div className="xl:w-[572px] ml-auto pt-5 md:pt-10 lg:pt-[88px] px-5 md:px-10 lg:px-12 pb-5">
      <p className="text-2xl text-[#0A0D13] font-semibold border-b border-[#ACACAC] pb-3">
        Payment
      </p>

      <div className="mt-8">
        <p className="text-lg text-[#0A0D13] font-semibold">Pay With:</p>
        <div className="flex items-center gap-5 mt-1">
          {["Card", "Bank", "Transfer"]?.map((option, index) => (
            <label
              key={index}
              className={`flex items-center space-x-2 text-base font-medium cursor-pointer ${
                selectedOption === option ? "text-[#0A0D13]" : "text-[#ACACAC] "
              }`}
            >
              <input
                type="radio"
                name="options"
                value={option}
                checked={selectedOption === option}
                onChange={handleChange}
                className="w-[15px] h-[15px] text-[#2A77D2] focus:ring-[#2A77D2]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <div className="mt-5">
          <form onSubmit={handleSumbit}>
              <CardElement className="font-inter font-[600] text-black border border-[#E0E0E0] rounded-md focus:outline-none text-[15px] mt-1 outline-none w-full p-4" />

            <button
            type="submit"
              className="w-full h-[52px] flex items-center justify-center bg-[#2A77D2] rounded-md text-base text-[#F3F3F3] cursor-pointer font-bold mt-7"
            >
              {isLoading ? <Loader /> : "Pay"}
            </button>
          </form>

          <p className="text-sm text-[#ACACAC] mt-5">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
