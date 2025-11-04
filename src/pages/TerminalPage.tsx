import Terminal from "@/components/Terminal";
import { useTerminal } from "@/stores/terminal";
import { Navigate, useNavigate } from "react-router";
import { useEffect } from "react";

export default function TerminalPage() {
  const { unlocked } = useTerminal();
  const navigate = useNavigate();

  useEffect(() => {
    if (unlocked) {
      // viewTransition is supported in react-router v7; cast the option field narrowly
      navigate("/home", { replace: true } as { replace: boolean } & Record<string, unknown>);
    }
  }, [unlocked, navigate]);

  return unlocked ? <Navigate to="/home" replace /> : <Terminal />;
} 
