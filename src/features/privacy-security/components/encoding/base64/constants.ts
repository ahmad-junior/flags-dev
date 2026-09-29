export type Base64Mode = "encode" | "decode";
export type InputType = "text" | "file";
export const BASE64_REGEX =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
