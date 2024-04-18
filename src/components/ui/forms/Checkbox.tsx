import { CheckboxProps } from "@/types/ui";

const TWCheckbox = ({
  name,
  label,
  register,
  errors,
  required,
  validationSchema,
  className,
}: CheckboxProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <input
      id={name}
      name={name}
      type="checkbox"
      className="mt-0.5 w-4 h-4 border-gray-200 rounded text-red-600 focus:ring-red-500 checked:accent-red-600 disabled:opacity-50 disabled:pointer-events-none"
      {...register(name, validationSchema)}
    />
    <label htmlFor={name} className="text-slate-800">
      {label}
      <span className="text-red-600">{required && "*"}</span>
    </label>
    {errors && errors[name] && (
      <span className="text-xs mt-1 text-red-600">{errors[name]?.message}</span>
    )}
  </div>
);
export default TWCheckbox;
