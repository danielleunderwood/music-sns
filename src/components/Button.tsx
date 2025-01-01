import { LinearProgress } from "@mui/material";
import classNames from "classnames";
import { MouseEventHandler, useState } from "react";

export interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

function Button({ onClick, text }: ButtonProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading && <LinearProgress />}
      <button
        onClick={async (event) => {
          setLoading(true);

          await Promise.resolve(onClick(event));

          setLoading(false);
        }}
        disabled={loading}
        className={classNames(
          {
            "bg-slate-600 text-slate-400 dark:bg-slate-400 dark:text-slate-600":
              loading,
          },
          {
            "border-t-4 border-slate-950 dark:border-slate-300 hover:border-slate-700 hover:dark:border-slate-50":
              !loading,
          },
          "w-full rounded-t-none p-2 transition bg-slate-950 text-white dark:bg-slate-300 dark:text-black"
        )}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
