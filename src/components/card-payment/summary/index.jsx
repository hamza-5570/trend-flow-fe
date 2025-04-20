import React from "react";

export default function Summary() {
  return (
    <div className="bg-[#F9FAFA] lg:pt-10 border-t lg:border-t-0 lg:border-l border-[#D9D9D9]">
      <div className="xl:w-[572px] p-5 md:p-10 lg:p-12">
        <p className="text-2xl text-[#0A0D13] font-semibold border-b border-[#ACACAC] pb-3">
          Order Summary
        </p>

        <div className="py-8">
          <div className="flex justify-between">
            <p className="text-lg text-[#0A0D13] font-medium">Fee</p>
            <p className="text-lg text-[#0A0D13] font-medium">$30</p>
          </div>

         
        </div>

        <div className="flex justify-between border-t border-b border-[#ACACAC] py-7">
          <p className="text-base text-[#0A0D13] font-medium">Subtotal</p>
          <p className="text-base text-[#0A0D13] font-medium">$30</p>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div>
            <p className="text-base text-[#0A0D13] font-medium">Total</p>
            <p className="text-sm text-[#ACACAC] pt-1">
              Including $0 in taxes
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-4xl text-[#0A0D13] font-medium">
              $30
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
