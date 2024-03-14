import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Custom components
function InputField(props: {
  id: string;
  defaultValue?: any;
  name?: string;
  label: string;
  extra?: string;
  placeholder: string;
  variant?: string;
  state?: string;
  type?: string;
  disabled?:boolean;
  value?: string;
  errMessage?: string;
  onChange?: any;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  passwordShow?: boolean;
  setPasswordShow?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    label,
    id,
    defaultValue,
    name,
    extra,
    type,
    placeholder,
    variant,
    state,
    errMessage,
    disabled,
    value,
    onChange,
    onKeyPress,
    onKeyDown,
    passwordShow,
    setPasswordShow,
  } = props;

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}
      >
        {label}
      </label>
     { id=="password"?<div className="relative left-0 right-auto">

      <input
            disabled={disabled}
        type={type}
        defaultValue={defaultValue}
        id={id}
        name={name}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : state === "success"
            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            : "border-gray-200 dark:!border-white/10 dark:text-white"
        }`}
        // className={`mt-1 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${disabled === true
        //   ? "!border-none !bg-gray-100 text-gray-700 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
        //   : state === "error"
        //     ? "border-orange-500 text-orange-500 placeholder:text-orange-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
        //     : state === "success"
        //       ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
        //       : "border-gray-200 dark:!border-white/10 dark:text-white"
        //   }`}
      />
        <button
            className="btn btn-link text-decoration-none text-muted absolute end-0 top-0 pe-3 pt-3"
            type="button"
            id="password-addon"
            onClick={() => setPasswordShow(!passwordShow)}
          >
            {passwordShow ? (
              <AiOutlineEyeInvisible
                className="h-5 w-5 cursor-pointer text-indigo-500"
                title="eye"
              />
            ) : (
              <AiOutlineEye
                className="h-5 w-5 cursor-pointer text-indigo-500"
                title="eye"
              />
            )}
          </button>
      </div>:
       <input
       disabled={disabled}
   type={type}
   defaultValue={defaultValue}
   id={id}
   name={name}
   onKeyPress={onKeyPress}
   onKeyDown={onKeyDown}
   placeholder={placeholder}
   value={value}
   onChange={onChange}
   className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
     disabled === true
       ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
       : state === "error"
       ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
       : state === "success"
       ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
       : "border-gray-200 dark:!border-white/10 dark:text-white"
   }`}
  //  className={`mt-1 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${disabled === true
  //    ? "!border-none !bg-gray-100 text-gray-700 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
  //    : state === "error"
  //      ? "border-orange-500 text-orange-500 placeholder:text-orange-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
  //      : state === "success"
  //        ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
  //        : "border-gray-200 dark:!border-white/10 dark:text-white"
  //    }`}
 />
      }

      {errMessage && <p className="text-sm text-orange-500">{errMessage}</p>}

    </div>
  );
}

export default InputField;
