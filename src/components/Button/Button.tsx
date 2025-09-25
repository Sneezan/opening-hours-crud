import type React from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "success" | "danger" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  rounded?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "medium",
  children,
  className = "",
  rounded = false,
  ...props
}: ButtonProps) => {
  const buttonClass = [
    styles.button,
    styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`],
    rounded && styles.buttonRounded,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
