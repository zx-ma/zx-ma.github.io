import { useCallback, useEffect, useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { pages } from "@/config/home";
import type { PageValue } from "@/config/home";
import { HomeSidebar } from "@/components/home/HomeSidebar";
import { HomeHeaderActions } from "@/components/home/HomeHeaderActions";
import { AboutTab } from "@/components/home/tabs/AboutTab";
import { ProjectsTab } from "@/components/home/tabs/ProjectsTab";
import { ContactTab } from "@/components/home/tabs/ContactTab";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<PageValue>("about");
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleTabChange = useCallback((value: PageValue) => {
    setActiveTab(value);
  }, []);

  const openCommandPalette = useCallback(() => {
    setCommandOpen(true);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-linear-to-br from-background to-muted/30 text-foreground">
        <HomeSidebar onOpenCommand={openCommandPalette} />
        <SidebarInset className="flex-1 bg-transparent">
          <div className="flex h-full min-h-0 flex-col">
            <header className="border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
              <div className="flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />
                  <div>
                    <p className="text-sm font-medium">Welcome back</p>
                    <p className="text-xs text-muted-foreground">
                      {
                        pages.find((page) => page.value === activeTab)
                          ?.description
                      }
                    </p>
                  </div>
                </div>
                <HomeHeaderActions />
              </div>
            </header>

            <main className="flex flex-1 min-h-0 p-4">
              <div className="flex h-full w-full flex-col rounded-xl border bg-background/70 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/50">
                <Tabs
                  value={activeTab}
                  onValueChange={(value) => handleTabChange(value as PageValue)}
                  className="flex h-full flex-col"
                >
                  <TabsList className="grid w-full grid-cols-3 gap-2 rounded-t-xl bg-muted/40 p-2">
                    {pages.map((page) => (
                      <TabsTrigger key={page.value} value={page.value}>
                        {page.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div className="flex-1">
                    <TabsContent
                      value="about"
                      className="h-full data-[state=inactive]:hidden"
                    >
                      <AboutTab />
                    </TabsContent>
                    <TabsContent
                      value="projects"
                      className="h-full data-[state=inactive]:hidden"
                    >
                      <ProjectsTab />
                    </TabsContent>
                    <TabsContent
                      value="contact"
                      className="h-full data-[state=inactive]:hidden"
                    >
                      <ContactTab />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.value}
                value={page.value}
                onSelect={() => {
                  handleTabChange(page.value);
                  setCommandOpen(false);
                }}
              >
                <page.icon className="size-4" />
                {page.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </SidebarProvider>
  );
}
