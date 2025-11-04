import { useEffect, useRef } from "react";
import { X, Minus } from "lucide-react";
import { useWindows, type AppId } from "@/stores/windows";

interface Props {
  id: AppId;
  children: React.ReactNode;
}

export default function Window({ id, children }: Props) {
  const { windows, focus, moveBy, close, minimize } = useWindows();
  const win = windows[id];
  const dragging = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragging.current) return;
      const { x, y } = dragging.current;
      moveBy(id, e.clientX - x, e.clientY - y);
      dragging.current = { x: e.clientX, y: e.clientY };
    }
    function onUp() {
      dragging.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }
    if (dragging.current) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [id, moveBy]);

  if (!win.visible || win.minimized) return null;

  return (
    <div
      role="dialog"
      aria-label={win.title}
      style={{
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
        // Tag for shared element transitions (minimize/restore)
        viewTransitionName: `app-${id}`,
      }}
      className="absolute rounded-lg border border-foreground/10 bg-background/80 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden"
      onMouseDown={() => focus(id)}
    >
      <div
        className="h-9 px-3 flex items-center justify-between border-b border-foreground/10 cursor-move select-none"
        onDoubleClick={() => minimize(id)}
        onPointerDown={(e) => {
          focus(id);
          dragging.current = { x: e.clientX, y: e.clientY };
        }}
      >
        <div className="text-sm font-medium truncate">{win.title}</div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Minimize"
            className="size-5 rounded-full bg-yellow-500/80 hover:bg-yellow-500/90"
            onClick={(e) => {
              e.stopPropagation();
              minimize(id);
            }}
          >
            <Minus className="size-3 mx-auto text-black/80" />
          </button>
          <button
            aria-label="Close"
            className="size-5 rounded-full bg-red-500/80 hover:bg-red-500/90"
            onClick={(e) => {
              e.stopPropagation();
              close(id);
            }}
          >
            <X className="size-3 mx-auto text-black/80" />
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-2.25rem)] overflow-auto p-4 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
