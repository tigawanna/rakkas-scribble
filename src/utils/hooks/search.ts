import { useEffect, useState, useTransition } from "react";
import { useDebouncedValue } from "./debounce";
import { navigate, useLocation } from "rakkasjs";

export function useSearchWithQuery() {
  const { current } = useLocation();
  const [_, startTransition] = useTransition();
  const url = current;
  const [keyword, setKeyword] = useState(url?.searchParams?.get("q") ?? "");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);
  // useEffect(() => {
  //   if (current) {
  //     setKeyword(url?.searchParams?.get("q") ?? "");
  //   }
  // },[])
  useEffect(() => {
    if (current && debouncedValue) {
      startTransition(() => {
        url?.searchParams?.set("q", debouncedValue);
        navigate(url);
      });
    }
  }, [debouncedValue]);
  return { debouncedValue, isDebouncing, keyword, setKeyword };
}
