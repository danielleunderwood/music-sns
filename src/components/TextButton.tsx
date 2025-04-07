import { ReactNode } from "react";

interface TextButtonProps {
  children: ReactNode;
  onClick: () => void;
}

function TextButton({ children, onClick }: TextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-1 font-bold text-blue-600 dark:text-blue-400 transition rounded-full hover:bg-green-100 hover:dark:bg-green-900"
    >
      {children}
    </button>
  );
}

export default TextButton;
