import { create } from "zustand";
import { withViewTransition } from "@/lib/vt";

export type AppId = "about" | "projects" | "contact";

export interface AppWindow {
  id: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  visible: boolean;
  minimized: boolean;
}

interface WindowsState {
  windows: Record<AppId, AppWindow>;
  activeId: AppId | null;
  nextZ: number;
  open: (id: AppId) => void;
  focus: (id: AppId) => void;
  moveBy: (id: AppId, dx: number, dy: number) => void;
  setPos: (id: AppId, x: number, y: number) => void;
  close: (id: AppId) => void;
  minimize: (id: AppId, value?: boolean) => void;
}

const defaults: Record<AppId, Omit<AppWindow, "z">> = {
  about: {
    id: "about",
    title: "About Me",
    x: 60,
    y: 80,
    w: 420,
    h: 300,
    visible: false,
    minimized: false,
  },
  projects: {
    id: "projects",
    title: "Projects",
    x: 120,
    y: 140,
    w: 520,
    h: 340,
    visible: false,
    minimized: false,
  },
  contact: {
    id: "contact",
    title: "Contact",
    x: 200,
    y: 120,
    w: 360,
    h: 220,
    visible: false,
    minimized: false,
  },
};

export const useWindows = create<WindowsState>((set) => ({
  windows: Object.fromEntries(
    (Object.keys(defaults) as AppId[]).map((id, i) => [
      id,
      { ...defaults[id], z: i + 1 },
    ])
  ) as Record<AppId, AppWindow>,
  activeId: null,
  nextZ: 10,
  open: (id) => withViewTransition(() =>
    set((state) => {
      const w = state.windows[id];
      const z = state.nextZ + 1;
      return {
        windows: {
          ...state.windows,
          [id]: { ...w, visible: true, minimized: false, z },
        },
        activeId: id,
        nextZ: z,
      };
    })
  ),
  focus: (id) => withViewTransition(() =>
    set((state) => {
      const w = state.windows[id];
      const z = state.nextZ + 1;
      return {
        windows: { ...state.windows, [id]: { ...w, z, minimized: false, visible: true } },
        activeId: id,
        nextZ: z,
      };
    })
  ),
  moveBy: (id, dx, dy) =>
    set((state) => {
      const w = state.windows[id];
      return {
        windows: { ...state.windows, [id]: { ...w, x: w.x + dx, y: w.y + dy } },
      };
    }),
  setPos: (id, x, y) =>
    set((state) => {
      const w = state.windows[id];
      return { windows: { ...state.windows, [id]: { ...w, x, y } } };
    }),
  close: (id) => withViewTransition(() =>
    set((state) => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], visible: false } },
      activeId: state.activeId === id ? null : state.activeId,
    }))
  ),
  minimize: (id, value) => withViewTransition(() =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], minimized: value ?? !state.windows[id].minimized, visible: true },
      },
      activeId: state.activeId === id ? null : state.activeId,
    }))
  ),
}));
