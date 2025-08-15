import Terminal from "@/components/Terminal";
import { useTerminal } from "@/stores/terminal";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function TerminalPage() {
  const { unlocked } = useTerminal();
  const navigate = useNavigate();

  useEffect(() => {
    if (unlocked) {
      navigate("/home", { replace: true });
    }
  }, [unlocked, navigate]);

  return <Terminal />;
} 