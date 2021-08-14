import { XCircle } from 'phosphor-react';

export default function ErrorMessage({ children }) {
  return (
    <p className="flex items-center text-groovy-red text-sm font-medium">
      <XCircle size={18} weight="fill" className="mb-auto mr-1" />
      {children}
    </p>
  );
}
