import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string[] | null | undefined;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Determine the input type dynamically
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="w-full">
        <div className="relative w-full">
          {label && (
            <label
              htmlFor={props.id}
              className="block text-sm font-medium text-foreground mb-1"
            >
              {label}
            </label>
          )}
          <input
            type={inputType}
            // className={cn(
            //   "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            //   type === "password" ? "pr-10" : "", // extra padding for the eye icon
            //   className
            // )}
            className={cn(
              "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              error
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-input",
              type === "password" ? "pr-10" : "",
              className
            )}
            ref={ref}
            {...props}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
