import { LinearProgress } from "@mui/material";
import classNames from "classnames";
import { MouseEventHandler, ReactNode, useState } from "react";

interface ButtonProps {
  children: ReactNode;
}

interface SubmitButtonProps extends ButtonProps {
  type: "submit";
}

interface StandardButtonProps extends ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;

  type: "reset" | "button" | undefined;
}

const isStandardButtonProps = (
  props: ButtonProps,
): props is StandardButtonProps => "onClick" in props;

function Button(props: SubmitButtonProps | StandardButtonProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading && <LinearProgress />}
      <button
        onClick={async (event) => {
          setLoading(true);

          if (isStandardButtonProps(props)) {
            await Promise.resolve(props.onClick(event));
          }

          setLoading(false);
        }}
        disabled={loading}
        className={classNames(
          "w-full p-1 transition border-b-4 bg-slate-950 dark:bg-slate-300 text-white dark:text-black border-b-slate-950 dark:border-b-slate-300",
          {
            "bg-slate-600 text-slate-400 dark:bg-slate-400 dark:text-slate-600":
              loading,
          },
          {
            "border-t-4 border-slate-950 dark:border-slate-300 hover:border-slate-500 hover:dark:border-slate-50":
              !loading,
          },
        )}
        type={props.type}
      >
        {props.children}
      </button>
    </div>
  );
}

export default Button;
