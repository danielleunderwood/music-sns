import classNames from "classnames";
import { MouseEventHandler, ReactNode, useState } from "react";
import { useFormStatus } from "react-dom";

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
  const formStatus = useFormStatus();

  const [internalLoading, setInternalLoading] = useState(false);

  const loading =
    formStatus.pending || (isStandardButtonProps(props) && internalLoading);

  return (
    <div
      className={classNames("relative overflow-hidden", {
        "rounded-full": props.type !== "submit",
      })}
    >
      <button
        onClick={async (event) => {
          setInternalLoading(true);

          if (isStandardButtonProps(props)) {
            await Promise.resolve(props.onClick(event));
          }

          setInternalLoading(false);
        }}
        disabled={loading}
        className={classNames(
          "w-full p-1 transition",
          {
            "bg-slate-950 dark:bg-slate-300 text-white dark:text-black hover:bg-slate-500 hover:dark:bg-slate-50 border-black dark:border-white":
              !loading && props.type !== "reset",
          },
          {
            "bg-slate-600 dark:bg-slate-400 text-slate-400 dark:text-slate-600 border-slate-600 dark:border-slate-400 ":
              loading && props.type !== "reset",
          },
          { "border rounded-full": props.type !== "submit" },
          {
            "bg-red-500 dark:bg-red-600 text-white dark:text-black border-red-800 dark:border-red-400 hover:bg-red-400 hover:dark:bg-red-400":
              !loading && props.type === "reset",
          },
          {
            "bg-red-200 dark:bg-red-800 text-red-50 dark:text-red-950 border-red-200 dark:border-red-800":
              loading && props.type === "reset",
          },
        )}
        type={props.type}
      >
        {props.children}
      </button>
      {loading && (
        <div
          aria-busy
          aria-hidden
          className="w-full h-full absolute top-0 opacity-50 animate-wipe bg-gradient-to-l from-white dark:from-zinc-900"
        ></div>
      )}
    </div>
  );
}

export default Button;
