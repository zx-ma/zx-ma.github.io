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
    { text: "          ▗▄▄▄       ▗▄▄▄▄    ▄▄▄▖             mzx@website" },
    { text: "          ▜███▙       ▜███▙  ▟███▛             --------------------" },
    { text: "           ▜███▙       ▜███▙▟███▛              OS: NixOS x86_64" },
    { text: "            ▜███▙       ▜██████▛               Host: 16Z90S-G.AA53A (0.1)" },
    { text: "     ▟█████████████████▙ ▜████▛     ▟▙         Kernel: Linux 6.15.3-zen1-1-zen" },
    { text: "    ▟███████████████████▙ ▜███▙    ▟██▙        Uptime: 2 days, 7 hours, 17 mins" },
    { text: "           ▄▄▄▄▖           ▜███▙  ▟███▛        Packages: 2892 (nix), 9 (flatpak)" },
    { text: "          ▟███▛             ▜██▛ ▟███▛         Shell: fish 4.0.2" },
    { text: "         ▟███▛               ▜▛ ▟███▛          DE: KDE Plasma 6.4.1" },
    { text: "▟███████████▛                  ▟██████████▙    WM: KWin (Wayland)" },
    { text: "▜██████████▛                  ▟███████████▛    WM Theme: Ant-Dark" },
    { text: "      ▟███▛ ▟▙               ▟███▛             Theme: ArcDark (Layan) [Qt], Arc-Dark [GTK2/3]" },
    { text: "     ▟███▛ ▟██▙             ▟███▛              Icons: Ant-Dark [Qt], Ant-Dark [GTK2/3/4]" },
    { text: "    ▟███▛  ▜███▙           ▝▀▀▀▀               Font: Noto Sans (10pt)" },
    { text: "    ▜██▛    ▜███▙ ▜██████████████████▛         Cursor: Dracula (24px)" },
    { text: "     ▜▛     ▟████▙ ▜████████████████▛          Terminal: kitty 0.42.1" },
    { text: "           ▟██████▙       ▜███▙                Terminal Font: JetBrainsMonoNF-Regular (11pt)" },
    { text: "          ▟███▛▜███▙       ▜███▙               CPU: Intel(R) Core(TM) Ultra 5 125H (18) @ 4.50 GHz" },
    { text: "         ▟███▛  ▜███▙       ▜███▙              GPU: Intel Arc Graphics @ 2.20 GHz [Integrated]" },
    { text: "         ▝▀▀▀    ▀▀▀▀▘       ▀▀▀▘              Memory: 9.51 GiB / 15.12 GiB (63%)" },
    { text: "                                               Swap: 9.96 GiB / 16.65 GiB (60%)" },
    { text: "                                               Disk (/): 580.99 GiB / 1.80 TiB (32%) - btrfs" },
  ],
  current: "",
  unlocked: false,
  push: (line) => set((state) => ({ lines: [...state.lines, line] })),
  setCurrent: (value) => set({ current: value }),
  clear: () =>
    set({
      lines: [
        { text: "          ▗▄▄▄       ▗▄▄▄▄    ▄▄▄▖             mzx@website" },
        { text: "          ▜███▙       ▜███▙  ▟███▛             --------------------" },
        { text: "           ▜███▙       ▜███▙▟███▛              OS: NixOS x86_64" },
        { text: "            ▜███▙       ▜██████▛               Host: 16Z90S-G.AA53A (0.1)" },
        { text: "     ▟█████████████████▙ ▜████▛     ▟▙         Kernel: Linux 6.15.3-zen1-1-zen" },
        { text: "    ▟███████████████████▙ ▜███▙    ▟██▙        Uptime: 2 days, 7 hours, 17 mins" },
        { text: "           ▄▄▄▄▖           ▜███▙  ▟███▛        Packages: 2892 (nix), 9 (flatpak)" },
        { text: "          ▟███▛             ▜██▛ ▟███▛         Shell: fish 4.0.2" },
        { text: "         ▟███▛               ▜▛ ▟███▛          DE: KDE Plasma 6.4.1" },
        { text: "▟███████████▛                  ▟██████████▙    WM: KWin (Wayland)" },
        { text: "▜██████████▛                  ▟███████████▛    WM Theme: Ant-Dark" },
        { text: "      ▟███▛ ▟▙               ▟███▛             Theme: ArcDark (Layan) [Qt], Arc-Dark [GTK2/3]" },
        { text: "     ▟███▛ ▟██▙             ▟███▛              Icons: Ant-Dark [Qt], Ant-Dark [GTK2/3/4]" },
        { text: "    ▟███▛  ▜███▙           ▝▀▀▀▀               Font: Noto Sans (10pt)" },
        { text: "    ▜██▛    ▜███▙ ▜██████████████████▛         Cursor: Dracula (24px)" },
        { text: "     ▜▛     ▟████▙ ▜████████████████▛          Terminal: kitty 0.42.1" },
        { text: "           ▟██████▙       ▜███▙                Terminal Font: JetBrainsMonoNF-Regular (11pt)" },
        { text: "          ▟███▛▜███▙       ▜███▙               CPU: Intel(R) Core(TM) Ultra 5 125H (18) @ 4.50 GHz" },
        { text: "         ▟███▛  ▜███▙       ▜███▙              GPU: Intel Arc Graphics @ 2.20 GHz [Integrated]" },
        { text: "         ▝▀▀▀    ▀▀▀▀▘       ▀▀▀▘              Memory: 9.51 GiB / 15.12 GiB (63%)" },
        { text: "                                               Swap: 9.96 GiB / 16.65 GiB (60%)" },
        { text: "                                               Disk (/): 580.99 GiB / 1.80 TiB (32%) - btrfs" },
      ],
    }),
  unlock: () => set({ unlocked: true }),
})); 