import MobileMenuItem from './MobileMenuItem';
import ThemeChanger from './ThemeChanger';

import { Activity } from 'phosphor-react';

export default function MobileNavbar() {
  return (
    <div className="border-gray-100/90 fixed z-50 bottom-0 w-full h-16 dark:bg-primary-dark bg-white border-t dark:border-gray-700 md:hidden">
      <div className="grid grid-cols-3 items-center h-full">
        <button className="inline-flex items-center justify-center w-full">
          <Activity size={22} />
        </button>
        <MobileMenuItem />
        <ThemeChanger />
      </div>
    </div>
  );
}
