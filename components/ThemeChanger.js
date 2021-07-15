import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, SunDim } from 'phosphor-react';
import { Switch } from '@headlessui/react';

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-1">
      <SunDim
        size={22}
        weight="fill"
        className={`${
          resolvedTheme === 'dark' ? 'text-gray-300' : 'text-[#FAB515]'
        }`}
      />
      <Switch
        checked={active}
        onChange={() => {
          if (setActive(true)) {
            return setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          } else {
            return setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
          }
        }}
        className={`${
          resolvedTheme === 'dark'
            ? 'bg-gray-600'
            : 'bg-gradient-to-r from-[#A78BFA] to-purple-300'
        } relative inline-flex items-center h-6 w-11 rounded-full focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Enable dark mode</span>
        <span
          aria-hidden="true"
          className={`${
            resolvedTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 bg-white rounded-full transform transition ease-in-out duration-300`}
        />
      </Switch>
      <Moon
        size={22}
        weight="fill"
        className={`${
          resolvedTheme === 'dark' ? 'text-gray-600' : 'text-gray-300'
        }`}
      />
    </div>
  );
}
