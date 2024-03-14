// Custom components
import React from "react";

function TextArea(props: {
  id: string;
  defaultValue?: any;
  name?: string;
  cols?: number;
  label?: string;
  extra: string;
  placeholder: string;
  variant: string;
  state?: string;
  disabled?: boolean;
  value?: string;
  errMessage?: string;
  height?: string;
  maxHeight?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const {
    label,
    id,
    defaultValue,
    name,
    extra,
    placeholder,
    variant,
    state,
    disabled,
    value,
    cols,
    onChange,
    height,
    maxHeight
  } = props;

  return (
    <div className={`${extra}`}>
      {label && <label
        htmlFor={id}
        className={`text-sm text-gray-600  dark:text-white  ${variant === "auth" ? "ml-1.5 font-bold text-sm font-bold text-gray-900 dark:text-white" : "ml-3 font-bold text-sm font-bold text-gray-900 dark:text-white"
          }`}
      >
        {label}
      </label>}
      <textarea
        disabled={disabled}
        defaultValue={defaultValue}
        id={id}
        name={name}
        cols={cols}
        placeholder={placeholder}
        style={{
          height: height ? height : "100px",
          maxHeight: maxHeight ? maxHeight : "250px"
        }}
        className={`mt-1 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none overflow-x-hidden scrollbar scrollbar-w-1 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${disabled === true
          ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)] text-gray-700"
          : state === "error"
            ? "border-orange-500 text-orange-500 placeholder:text-orange-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : state === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextArea;
