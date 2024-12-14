"use client"

import * as React from "react"
import { Input } from "./input"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordRequirement {
  text: string;
  validator: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  {
    text: "At least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    text: "At least one uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    text: "At least one lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    text: "At least one number",
    validator: (password) => /[0-9]/.test(password),
  },
  {
    text: "At least one special character",
    validator: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  onValidityChange?: (isValid: boolean) => void;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, onValidityChange, onChange, ...props }, ref) => {
    const [password, setPassword] = React.useState("");
    const [focused, setFocused] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      onChange?.(e);

      // Check if all requirements are met
      const isValid = requirements.every(req => req.validator(e.target.value));
      onValidityChange?.(isValid);
    };

    const shouldShowRequirements = (focused || password) && !requirements.every(req => req.validator(password));

    return (
      <div>
        <Input
          type="password"
          className={className}
          ref={ref}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        <div 
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out text-sm",
            shouldShowRequirements ? "max-h-[200px] opacity-100 mt-2" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-2">
            {requirements.map((requirement, index) => {
              const isMet = requirement.validator(password);
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center space-x-2 transition-colors duration-200",
                    isMet ? "text-green-600" : "text-gray-500"
                  )}
                >
                  <div className="w-4 h-4">
                    {isMet ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </div>
                  <span>{requirement.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput }; 