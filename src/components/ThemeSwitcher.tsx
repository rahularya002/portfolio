"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Monitor } from "lucide-react";
import { MoonIcon } from "@radix-ui/react-icons";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-colors duration-200">
        {theme === 'dark' ? <MoonIcon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default ThemeSwitcher;