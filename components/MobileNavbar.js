import MobileAnalytics from './MobileAnalytics';
import MobileMenuItem from './MobileMenuItem';
import ThemeChanger from './ThemeChanger';

export default function MobileNavbar() {
  return (
    <nav className="border-gray-100/90 fixed z-50 bottom-0 w-full h-16 dark:bg-primary-dark bg-white border-t dark:border-gray-700 md:hidden">
      <div className="grid grid-cols-3 items-center justify-center h-full">
        <MobileAnalytics />
        <MobileMenuItem />
        <ThemeChanger />
      </div>
    </nav>
  );
}
