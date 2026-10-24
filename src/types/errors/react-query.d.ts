import "@tanstack/react-query";
import type { APIError } from "./APIError.types";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: APIError;
  };
};