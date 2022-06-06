export const isSSR = !(
  typeof window !== "undefined" && window.document?.createElement
);
export default isSSR;
