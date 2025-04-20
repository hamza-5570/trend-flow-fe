import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <>
      <Image
        src={"/assets/png/logo.png"}
        width={432}
        height={297}
        alt="logo"
        className="w-[108px]"
      />
    </>
  );
}
