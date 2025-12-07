import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTerminal } from "@/stores/terminal";
import { ArrowRight } from "lucide-react";

const PROMPT_USER = "guest";
const PROMPT_HOST = "mzx";
const PROMPT_PATH = "~";
const PROMPT = `${PROMPT_USER}@${PROMPT_HOST}:${PROMPT_PATH}$`;

type CommandHandler = (
  args: string[],
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

  const showHint = () => {
    push({
      text: "Hint: commands like `help`, `ls`, `cat about.txt` can be interesting.",
    });
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-700 text-neutral-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-3xl border border-neutral-700 bg-neutral-900/90 shadow-2xl backdrop-blur-xl">
        <div className="border-b border-neutral-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-rose-500/80" />
              <span className="size-3 rounded-full bg-amber-400/80" />
              <span className="size-3 rounded-full bg-emerald-400/80" />
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800/70 px-3 py-1 text-xs font-semibold uppercase text-amber-300">
              {PROMPT_HOST} shell
            </span>
          </div>
          <TooltipProvider>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-neutral-300 hover:text-neutral-100"
                    onClick={() => {
                      showHint();
                      inputRef.current?.focus();
                    }}
                  >
                    <ArrowRight className="size-3" />
                    Hint
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Get a gentle nudge without revealing the answer
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        <ScrollArea
          className="h-[65vh] px-6 py-5 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          <div ref={viewport} className="space-y-2">
            {lines.map((line, i) => (
              <div
                key={i}
                className={
                  line.prompt
                    ? "whitespace-pre-wrap font-semibold text-emerald-300"
                    : line.isBanner
                      ? "whitespace-pre font-bold text-emerald-400 ascii-banner"
                      : "whitespace-pre-wrap text-neutral-400"
                }
              >
                {line.text}
              </div>
            ))}

            <div className="flex items-center gap-2 pt-2 text-emerald-300">
              <span className="shrink-0">
                <span>{PROMPT_USER}</span>
                <span className="text-neutral-500">@</span>
                <span>{PROMPT_HOST}</span>
                <span className="text-neutral-500">:</span>
                <span className="text-emerald-400">{PROMPT_PATH}</span>
                <span className="text-neutral-500">$</span>
              </span>
              <Input
                ref={inputRef}
                autoFocus
                aria-label="terminal input"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                onKeyDown={onKey}
                className="flex-1 border-none bg-transparent px-0 font-mono text-emerald-200 caret-emerald-400 focus-visible:ring-0"
              />
            </div>

            <p className="text-xs text-neutral-500">
              Tip: ↑↓ for history • Tab to autocomplete • type `help` for a
              command list
            </p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
