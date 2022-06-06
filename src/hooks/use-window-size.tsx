import { useState, useLayoutEffect } from "react";
import isSSR from "../utils/is-ssr";

type WindowSizeProps = {
  width: number;
  height: number;
};

const getWindowsSize = (what: "width" | "height"): number => {
  if (isSSR) return 0;
  return what === "height" ? window.innerHeight : window.innerWidth;
};

const useWindowSize = (): WindowSizeProps => {
  const [size, setSize] = useState<WindowSizeProps>({
    width: getWindowsSize("width"),
    height: getWindowsSize("height"),
  });

  useLayoutEffect(() => {
    function handleWindowSize() {
      setSize({
        width: getWindowsSize("width"),
        height: getWindowsSize("height"),
      });
    }
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  return size;
};

export default useWindowSize;
