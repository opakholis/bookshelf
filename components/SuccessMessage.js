import { CheckCircle } from 'phosphor-react';

export default function SuccessMessage({ children }) {
  return (
    <p className="flex items-center text-groovy-green text-sm font-medium">
      <CheckCircle size={18} weight="fill" className="mb-auto mr-1" />
      {children}
    </p>
  );
}
