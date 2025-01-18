import classNames from "classnames";
import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  type: "poster" | "listened";
}

function Tag({ children, type }: TagProps) {
  return (
    <div
      className={classNames(
        "flex items-center border rounded-full px-2 text-sm gap-1",
        {
          "bg-blue-200 dark:bg-blue-800 border-blue-800 dark:border-blue-200 text-blue-800 dark:text-blue-200":
            type === "listened",
        },
        {
          "bg-black dark:bg-white border-black dark:border-transparent text-white dark:text-black":
            type === "poster",
        },
      )}
    >
      {children}
    </div>
  );
}

export default Tag;
