import { Activity } from 'phosphor-react';

export default function MobileAnalytics() {
  return (
    <button
      className="inline-flex items-center justify-center w-full"
      aria-label="Analytics"
    >
      <Activity size={22} />
    </button>
  );
}
