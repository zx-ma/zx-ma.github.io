import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { useTerminal } from "@/stores/terminal";

const PROMPT = "guest@mzx:~$ ";

const COMMANDS: Record<string, string> = {
  clear: "",
};

const SECRET = "sudo nixos-rebuild switch";

export default function Terminal() {
  const { lines, push, clear, current, setCurrent, unlock } = useTerminal();
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight });
  }, [lines]);

  const run = () => {
    const cmd = current.trim();
    if (!cmd) return;

    if (cmd === SECRET) {
      push({ text: PROMPT + cmd, prompt: true });
      push({ text: "Puzzle solved! Redirecting..." });
      unlock();
      return;
    }
    if (cmd === "clear") {
      clear();
    } else {
      push({ text: PROMPT + cmd, prompt: true });
      const output = COMMANDS[cmd] ?? `command not found: ${cmd}`;
      push({ text: output });
    }
    setCurrent("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run();
    }
  };

  return (
    <div
      ref={viewport}
      className="h-screen w-full bg-black text-green-400 font-mono p-4 overflow-y-auto"
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className={line.prompt ? "whitespace-pre-wrap font-bold" : "whitespace-pre-wrap"}
        >
          {line.text}
        </div>
      ))}

      <div className="flex items-center gap-2">
        <span>{PROMPT}</span>
        <Input
          autoFocus
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 bg-transparent border-none focus-visible:ring-0 outline-none caret-green-400 text-green-400 placeholder:text-green-500 font-mono"
        />
      </div>
    </div>
  );
} 