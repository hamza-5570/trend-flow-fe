import React from "react";

export default function InputFiled({
  type = "text",
  placeholder = "Search  by SKU",
  field,
  form,
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...field}
      {...props}
      onchange={(e) => form.setFieldValue(field.name, e.target.value)}
      className="w-full md:w-[448px] lg:w-full h-12 border border-[#DBE0E5] rounded-xl text-[#121417] text-base placeholder:text-[#637587] px-5 mt-2"
    />
  );
}
