import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export default function RecordCard({cart,setCart,item,id,resetQuantity,setResetQuantity}) {
  const [value, setValue] = useState(0);

  const handlePlus = () => {
    setValue((prevValue) => prevValue + 1);
    const updatedCart = cart?.map((item) => {
      console.log(item.product,id)

      if (item.product == id) {
        console.log("under a gaya")

        return {
          ...item,
          stock: item.stock + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    setResetQuantity(false)

  };

  useEffect(() => {
    if (resetQuantity) {
      setValue(0);
    }
  }, [resetQuantity]);

 
  const handleMinus = () => {
     // previous value should not be negative
    if (value === 0) {
      return;
    }

    setValue((prevValue) => prevValue - 1);
    const updatedCart = cart?.map((item) => {
      if (item.product === id) {
        return {
          ...item,
          stock: item.stock - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    setResetQuantity(false)

  };
  return (
    <div className="flex items-center justify-between mt-5">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/png/card-1.png"
          alt=""
          width={280}
          height={280}
          className="w-[70px] h-[70px]"
        />
        <div>
          <p className="text-sm md:text-base text-[#121417] font-medium">
            {item?.inventory.productId?.name}
          </p>
          <p className="text-sm md:text-base text-[#637587]">
            A week of inventory left
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="w-[20px] h-[20px] md:w-[28px] md:h-[28px] flex items-center justify-center bg-[#F0F2F5] rounded-full cursor-pointer"
          onClick={handleMinus}
        >
          <AiOutlineMinus size={16} color="#000" />
        </div>
        <div className="text-xs md:text-base text-[#121417] font-medium">
          {value}
        </div>
        <div
          className="w-[20px] h-[20px] md:w-[28px] md:h-[28px] flex items-center justify-center bg-[#F0F2F5] rounded-full cursor-pointer"
          onClick={handlePlus}
        >
          <AiOutlinePlus size={16} color="#000" />
        </div>
      </div>
    </div>
  );
}
