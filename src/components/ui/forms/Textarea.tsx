import { InputProps, TextareaProps } from "@/types/ui";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import React, { useState } from "react";

const TWTextarea = ({
  name,
  label,
  rows = 3,
  register,
  errors,
  validationSchema,
  className,
}: TextareaProps) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={name} className="text-slate-800">
      {label}
      <span className="text-red-600">{validationSchema.required && "*"}</span>
    </label>
    <textarea
      id={name}
      name={name}
      rows={rows}
      className="p-2 mt-1 border border-slate-200 rounded-lg outline-none ring-red-500 focus:ring-1 transition-all duration-300 ease-in-out shadow-red-500/20 focus:shadow-md"
      {...register(name, validationSchema)}
    />
    {errors && errors[name] && (
      <span className="text-xs mt-1 text-red-600">{errors[name]?.message}</span>
    )}
  </div>
);
export default TWTextarea;
