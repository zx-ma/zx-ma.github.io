import Terminal from "@/components/Terminal";
import { useTerminal } from "@/stores/terminal";
import { Navigate } from "react-router";

export default function TerminalPage() {
  const { unlocked } = useTerminal();
  return unlocked ? <Navigate to="/home" replace /> : <Terminal />;
} 
