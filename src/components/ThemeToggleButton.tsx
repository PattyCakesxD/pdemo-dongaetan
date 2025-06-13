"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggleButton({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log();
  };

  return (
    <div
      className={cn("cursor-pointer size-7 relative", className)}
      onClick={handleClick}
    >
      <Sun className="absolute size-full scale-100 rotate-0 text-primaryBlue transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-full scale-0 rotate-90 text-primaryBlue transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
