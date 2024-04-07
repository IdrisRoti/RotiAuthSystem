import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

type TInput = {
    label: string,
    name: string,
    type: string,
    placeholder: string,
    register: UseFormRegister<FieldValues>,
    errors:FieldErrors<FieldValues>
}

const Input = ({label, name, type, placeholder, register, errors}: TInput) => {
  return (
    <div className="mt-1">
      <label htmlFor="name" className="text-sm font-semibold">
        {label}
      </label>
      <input
        className="w-full mt-2 border-2 placeholder:text-sm border-slate-300 dark:border-slate-600 p-2 rounded-md dark:focus:border-green-600 focus:border-green-600 focus:border-2 focus:outline-none dark:bg-slate-800"
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(`${name}`, {required: true})}
      />
         

         {errors[name] ? (
        <div className="flex items-center">
        <MdErrorOutline size={13} className="mr-1 text-red-700" />
        {/* @ts-ignore */}
        <p className="text-xs text-red-600 dark:opacity-70">{errors[name]?.message}</p>
      </div>
      ): (<div className="flex items-center">
        <MdErrorOutline size={13} className="opacity-0" />
        {/* @ts-ignore */}
        <p className="text-xs text-red-700 opacity-0">.</p>
      </div>)}


    </div>
  )
};

export default Input;
