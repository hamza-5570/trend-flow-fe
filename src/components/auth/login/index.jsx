import Loader from "@/components/common/loader";
import { useUserLoginMutation } from "@/lib/services/auth-api";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [login, { isLoading }] = useUserLoginMutation();

  const handleSubmit = () => {
    login({
      email: formData.email,
      password: formData.password,
    })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        localStorage.setItem("token", res?.token);
        localStorage.setItem("user",JSON.stringify(res?.data));
        const userDate=new Date(res?.data?.createdAt).getDate()
        const todayDate=new Date().getDate()
        const daysDifference = Math.floor((todayDate - userDate) / (1000 * 60 * 60 * 24));
        if (todayDate >= userDate && daysDifference >= 3 && !res?.data?.isSubscribed) {
          router.push("/payment/card-payment");
        } else {
          router.push("/dashboard");
        }
})
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  return (
    <>
      <p className="text-3xl text-black font-bold text-center">Welcome</p>
      <div className="pt-12">
        <div>
          <p className="text-base text-[#696F79] font-medium">Email address*</p>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Enter email address"
            className="w-full h-13 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black mt-3 px-7 text-sm md:text-base"
          />
        </div>

        <div className="mt-5">
          <p className="text-base text-[#696F79] font-medium">Password*</p>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            placeholder="Enter password"
            className="w-full h-13 md:h-[64px] rounded-full border border-[#8692A6] placeholder:text-[#8692A6] text-black text-sm md:text-base mt-3 px-7"
          />
        </div>

        <Link href={"/auth/forgot-password"}>
          <button className="text-base text-black font-medium underline mt-5 cursor-pointer">
            Forgot Password?
          </button>
        </Link>

        <button
          onClick={handleSubmit}
          disabled={!formData.email || !formData.password}
          className="w-full h-12 flex items-center justify-center bg-black text-white font-semibold rounded-full mt-8 cursor-pointer text-sm md:text-base disabled:cursor-default disabled:opacity-50"
        >
          {isLoading ? <Loader /> : "Log in"}
        </button>

        <Link href={"/auth/sign-up"}>
          <p className="text-base font-semibold text-[#696F79] text-center pt-7">
            Don’t you have an account?{" "}
            <span className="text-black font-bold cursor-pointer">Signup</span>
          </p>
        </Link>
      </div>
    </>
  );
}
