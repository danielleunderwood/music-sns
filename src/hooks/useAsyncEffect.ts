import { DependencyList, useEffect, useState } from "react";

export enum Status {
  Idle,
  Loading,
  Error,
}

interface UseAsyncEffectProps<T> {
  effect: () => Promise<T>;

  deps: DependencyList;

  initialValue: T;
}

const useAsyncEffect = <T>({
  effect,
  deps,
  initialValue,
}: UseAsyncEffectProps<T>) => {
  const [status, setStatus] = useState(Status.Loading);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    (async () => {
      try {
        setStatus(Status.Loading);

        const updatedValue = await effect();

        setValue(updatedValue);

        setStatus(Status.Idle);
      } catch {
        setStatus(Status.Error);
      }
    })();
  }, deps);

  return { status, value };
};

export default useAsyncEffect;
