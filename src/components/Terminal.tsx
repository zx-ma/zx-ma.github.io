import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Snowflake } from "lucide-react";
import type { KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { useTerminal } from "@/stores/terminal";

const PROMPT_USER = "guest";
const PROMPT_HOST = "mzx";
const PROMPT_PATH = "~";
const PROMPT = `${PROMPT_USER}@${PROMPT_HOST}:${PROMPT_PATH}$`;

type CommandHandler = (
  args: string[]
) => Promise<string | string[] | void> | (string | string[] | void);

const registry: Record<string, CommandHandler> = {
  help: () => [
    "Available commands:",
    "  help           Show this help",
    "  clear          Clear the terminal",
    "  echo [text]    Print text",
    "  date           Show current date/time",
    "  whoami         Show current user",
    "  pwd            Show current path",
    "  ls             List some fake files",
    "  cat [file]     Read a fake file (about.txt, projects.txt)",
  ],
  clear: () => {
    // handled specially in run()
  },
  echo: (args) => args.join(" "),
  date: () => new Date().toLocaleString(),
  whoami: () => PROMPT_USER,
  pwd: () => "/home/" + PROMPT_USER,
  ls: () => ["about.txt", "projects.txt"].join("  "),
  cat: (args) => {
    const file = args[0];
    if (!file) return "usage: cat <file>";
    if (file === "about.txt") {
      return [
        "Hi, I'm mzx — building beautiful things.",
        "This site hides a small puzzle. Have fun!",
      ];
    }
    if (file === "projects.txt") {
      return [
        "- terminal-ui: minimalist terminal-like UI",
        "- personal-site: experiments with Vite + React",
      ];
    }
    return `cat: ${file}: No such file`;
  },
};

// Compare input to a precomputed SHA-256 hex of the secret to avoid plain-text search
const SECRET_HASH_HEX =
  "1750fe118f27c9838d1495c3ccf2002fad523cce4d8cfadc332d701c9a1fea47"; // sha256("sudo nixos-rebuild switch")

async function sha256Hex(text: string) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Terminal() {
  const { lines, push, clear, current, setCurrent, unlock } = useTerminal();
  const viewport = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lightweight history kept local to component
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistoryIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = viewport.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const commandNames = useMemo(() => Object.keys(registry), []);

  const complete = () => {
    const raw = current;
    const [head, ...rest] = raw.trimStart().split(/\s+/);
    if (!head) return;
    const matches = commandNames.filter((c) => c.startsWith(head));
    if (matches.length === 1) {
      const completed = [matches[0], ...rest].join(" ");
      setCurrent(completed + (raw.endsWith(" ") ? "" : " "));
    }
  };

  const run = async () => {
    const cmdLine = current.trim();
    if (!cmdLine) return;

    // Store into history
    setHistory((h) => [...h, cmdLine]);
    setHistoryIndex(null);

    // Echo the prompt + command
    push({ text: `${PROMPT} ${cmdLine}`, prompt: true });

    // Secret check
    try {
      const hash = await sha256Hex(cmdLine);
      if (hash === SECRET_HASH_HEX) {
        push({ text: "Puzzle solved! Redirecting..." });
        setCurrent("");
        unlock();
        return;
      }
    } catch {
      // Ignore crypto errors
    }

    const [name, ...args] = cmdLine.split(/\s+/);
    if (name === "clear") {
      clear();
      setCurrent("");
      return;
    }

    const handler = registry[name];
    if (!handler) {
      push({ text: `command not found: ${name}` });
      setCurrent("");
      return;
    }

    const out = await handler(args);
    if (typeof out === "string") {
      push({ text: out });
    } else if (Array.isArray(out)) {
      out.forEach((t) => push({ text: t }));
    }
    setCurrent("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void run();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      complete();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIndex((idx) => {
        const next = idx == null ? history.length - 1 : Math.max(0, idx - 1);
        const val = history[next] ?? history[0];
        if (val != null) setCurrent(val);
        return next;
      });
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIndex((idx) => {
        if (idx == null) return null;
        const next = idx + 1;
        if (next >= history.length) {
          setCurrent("");
          return null;
        }
        const val = history[next];
        if (val != null) setCurrent(val);
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-black/95 text-green-400 font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[80vh] rounded-lg border border-green-400/20 bg-black/80 shadow-2xl backdrop-blur-sm overflow-hidden">
        {/* Title bar */}
        <div className="h-10 border-b border-green-400/10 flex items-center gap-2 px-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-500/80" />
            <span className="size-3 rounded-full bg-yellow-500/80" />
            <span className="size-3 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-3 flex items-center gap-2 text-xs text-green-300/80">
            <Snowflake className="size-4 text-sky-400" aria-hidden />
            <span>{PROMPT_HOST} — terminal</span>
          </div>
        </div>

        {/* Viewport */}
        <div
          ref={viewport}
          className="h-[calc(80vh-2.5rem)] w-full overflow-y-auto px-4 py-3 selection:bg-green-500/30"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.prompt
                  ? "whitespace-pre-wrap font-semibold text-green-300"
                  : "whitespace-pre-wrap"
              }
            >
              {line.text}
            </div>
          ))}

          {/* Prompt row */}
          <div className="flex items-center gap-2 pt-1">
            <span className="shrink-0">
              <span className="text-green-300">{PROMPT_USER}</span>
              <span className="text-green-500">@</span>
              <span className="text-green-300">{PROMPT_HOST}</span>
              <span className="text-green-500">:</span>
              <span className="text-emerald-400">{PROMPT_PATH}</span>
              <span className="text-green-500">$</span>
            </span>
            <Input
              ref={inputRef}
              autoFocus
              aria-label="terminal input"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              onKeyDown={onKey}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 outline-none caret-green-400 text-green-200 placeholder:text-green-500 font-mono"
            />
          </div>

          {/* Hint */}
          <div className="mt-2 text-xs text-green-300/60">
            Tip: Up/Down for history • Tab to complete • type `help`
          </div>
        </div>
      </div>
    </div>
  );
}
