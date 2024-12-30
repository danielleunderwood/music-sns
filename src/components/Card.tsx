import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="border border-black dark:border-white rounded-xl overflow-hidden">
      {children}
    </div>
  );
}

export default Card;
