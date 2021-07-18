import { Activity } from 'phosphor-react';

export default function MobileAnalytics() {
  return (
    <button
      className="dark:hover:bg-gray-900/40 flex flex-col items-center justify-center w-24 h-12 text-xs hover:bg-gray-100 focus:outline-none"
      aria-label="Analytics"
    >
      <Activity size={22} />
      Statistik
    </button>
  );
}
