import { create } from "zustand";
import { getBannerLines } from "@/constants/banner";

export interface Line {
  text: string;
  prompt?: boolean;
  isBanner?: boolean;
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

const getInitialLines = () => [
  { text: "" },
  ...getBannerLines().map((text) => ({ text, isBanner: true })),
  { text: "" },
  { text: "           ❄  Nix • mzx@website" },
  { text: "----------------------------------------" },
  { text: "👋 Hey! I'm MZX - CS student, NixOS enthusiast, terminal UI lover" },
  { text: "" },
  { text: "Type 'help' to see available commands." },
  { text: "Use Up/Down for history, Tab for completion." },
];

export const useTerminal = create<TerminalState>((set) => ({
  lines: getInitialLines(),
  current: "",
  unlocked: false,
  push: (line) => set((state) => ({ lines: [...state.lines, line] })),
  setCurrent: (value) => set({ current: value }),
  clear: () => set({ lines: getInitialLines() }),
  unlock: () => set({ unlocked: true }),
})); 
