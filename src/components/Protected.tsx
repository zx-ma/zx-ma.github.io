import { useTerminal } from "@/stores/terminal";
import { Navigate } from "react-router";
import type { PropsWithChildren } from "react";

export default function Protected({ children }: PropsWithChildren) {
  const { unlocked } = useTerminal();
  if (!unlocked) {
    return <Navigate to="/" replace />;
  }
  return children;
} 