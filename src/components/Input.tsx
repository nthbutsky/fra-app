import styles from "@/app/styles/Input.module.css";
import React, { useState } from "react";

import clsx from "clsx";

import Icon, { IconMap } from "@/components/Icon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: keyof IconMap;
  onClear: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, onClear, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = () => {
      setFocused(false);
    };

    return (
      <div className="relative rounded bg-neutral-2">
        {icon && (
          <Icon
            name={icon}
            className={clsx("absolute left-4 top-[10px] text-neutral-1-48", {
              "text-color-2": focused,
              "text-neutral-3": !props.disabled,
            })}
          />
        )}
        <input
          type={type}
          id="input"
          className={clsx(
            "font-4 inline-block h-[44px] w-full rounded border-[1px] border-neutral-1-12 px-4 py-2 text-color-1 caret-color-1 placeholder:font-4 placeholder:text-neutral-3 placeholder:transition placeholder:ease-in-out",
            {
              "outline-none transition ease-in-out focus:border-transparent focus:placeholder-transparent":
                focused,
              "bg-neutral-2 transition ease-in-out hover:border-color-1-50":
                !props.disabled,
              "cursor-not-allowed bg-color-2-05 placeholder:text-neutral-1-48":
                props.disabled,
              "pl-12": icon,
            },
            className,
            focused ? styles["input-outline"] : "",
            styles["input-cancel-btn"],
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {props.value !== "" && (
          <button
            type="button"
            className="absolute right-[10px] top-3 flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border-[1px] border-neutral-1-12 bg-color-2-05"
            onClick={onClear}
          >
            <Icon name="close" className="h-3 w-3 text-color-1" />
          </button>
        )}
      </div>
    );
  },
);

export default Input;
