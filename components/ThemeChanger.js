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
    <>
      <section className="hidden md:block">
        <div className="flex items-center space-x-1">
          <SunDim
            size={22}
            weight="fill"
            className={`${
              resolvedTheme === 'dark' ? 'text-gray-500' : 'text-groovy-orange'
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
                ? 'bg-black'
                : 'bg-gradient-to-r to-groovy-purple from-purple-light'
            } relative inline-flex items-center h-6 w-11 rounded-full focus:outline-none focus-visible:ring-2 dark:focus-visible:ring-groovy-purple focus-visible:ring-gray-400`}
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
              resolvedTheme === 'dark' ? 'text-purple-dark' : 'text-gray-300'
            }`}
          />
        </div>
      </section>

      {/* mobile */}
      <section className="md:hidden">
        <button
          aria-label="Switch theme"
          className="dark:hover:bg-gray-900/40 flex flex-col items-center justify-center w-24 h-12 text-xs hover:bg-gray-100 focus:outline-none"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {resolvedTheme === 'dark' ? <SunDim size={22} /> : <Moon size={22} />}
          Mode {resolvedTheme === 'dark' ? 'Terang' : 'Gelap'}
        </button>
      </section>
    </>
  );
}
