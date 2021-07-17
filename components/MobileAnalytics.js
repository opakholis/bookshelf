import { Activity } from 'phosphor-react';

export default function MobileAnalytics() {
  return (
    <button
      className="flex flex-col items-center justify-center w-full text-xs"
      aria-label="Analytics"
    >
      <Activity size={22} />
      Analytics
    </button>
  );
}
