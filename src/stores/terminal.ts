import { create } from "zustand";

export interface Line {
  text: string;
  prompt?: boolean;
}

interface TerminalState {
  lines: Line[];
  push: (line: Line) => void;
  clear: () => void;
  current: string;
  setCurrent: (value: string) => void;
  unlocked: boolean;
  unlock: () => void;
}

export const useTerminal = create<TerminalState>((set) => ({
  lines: [
    { text: "           ❄  Nix • mzx@website" },
    { text: "----------------------------------------" },
    { text: "Welcome! This is a terminal-like UI for my blog." },
    { text: "Type 'help' to see available commands." },
    { text: "Use Up/Down for history, Tab for completion." },
  ],
  current: "",
  unlocked: false,
  push: (line) => set((state) => ({ lines: [...state.lines, line] })),
  setCurrent: (value) => set({ current: value }),
  clear: () =>
    set({
      lines: [
        { text: "           ❄  Nix • mzx@website" },
        { text: "----------------------------------------" },
        { text: "Welcome! This is a terminal-like UI for my blog." },
        { text: "Type 'help' to see available commands." },
        { text: "Use Up/Down for history, Tab for completion." },
      ],
    }),
  unlock: () => set({ unlocked: true }),
})); 
