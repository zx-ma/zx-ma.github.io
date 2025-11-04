import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarRail,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Command as CommandIcon } from "lucide-react";
import { highlights, latestWriting } from "@/data/home";

interface HomeSidebarProps {
  onOpenCommand: () => void;
}

export function HomeSidebar({ onOpenCommand }: HomeSidebarProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <SidebarHeader className="gap-3">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:py-1">
            mzx
          </div>
          <span className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
            Now
          </span>
        </div>
        <SidebarInput
          placeholder="Filter"
          aria-label="Filter"
          className="group-data-[collapsible=icon]:hidden"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Highlights</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {highlights.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    className="gap-2"
                  >
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                    >
                      <item.icon className="size-4" />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.label}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Latest Writing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {latestWriting.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label} className="gap-2">
                    <a href={item.href}>
                      <span className="truncate">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          onClick={onOpenCommand}
        >
          <CommandIcon className="size-4" />
          <span className="group-data-[collapsible=icon]:hidden">Command Palette</span>
        </Button>
        <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />
        <div className="space-y-1 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <p>Tip: ⌘/Ctrl + K to jump around.</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
