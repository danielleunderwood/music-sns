import classNames from "classnames";
import { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
}

function Image({ src, alt }: ImageProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={classNames(
          "w-full h-full animate-pulse bg-gray-500 rounded-xl",
          { hidden: show },
        )}
      />
      <img
        className={classNames("w-full", { hidden: !show })}
        onLoad={() => {
          setShow(true);
        }}
        src={src}
        alt={alt}
      />
    </>
  );
}

export default Image;
