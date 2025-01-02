import { LinearProgress } from "@mui/material";
import classNames from "classnames";
import { MouseEventHandler, useState } from "react";

interface ButtonProps {
  text: string;
}

interface SubmitButtonProps extends ButtonProps {
  type: "submit";
}

interface StandardButtonProps extends ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;

  type: "reset" | "button" | undefined;
}

const isStandardButtonProps = (
  props: ButtonProps
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
        type={props.type}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
