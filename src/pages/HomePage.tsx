import { useCallback, useEffect, useState } from "react";
import {
  SidebarProvider,
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
  SidebarInset,
  SidebarTrigger,
  SidebarInput,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Command as CommandIcon,
  ExternalLink,
  Github,
  Mail,
  User,
} from "lucide-react";

const pages = [
  {
    value: "about",
    label: "About",
    description: "Who I am and what I’m exploring.",
    icon: User,
  },
  {
    value: "projects",
    label: "Projects",
    description: "Selected work and experiments.",
    icon: Briefcase,
  },
  {
    value: "contact",
    label: "Contact",
    description: "Ways to reach me around the web.",
    icon: Mail,
  },
] as const;

type PageValue = (typeof pages)[number]["value"];

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
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background to-muted/30 text-foreground">
        <Sidebar collapsible="icon" className="border-r border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarHeader className="gap-3">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                mzx.dev
              </div>
              <span className="text-xs text-muted-foreground">Workspace</span>
            </div>
            <SidebarInput placeholder="Filter pages" aria-label="Filter pages" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {pages.map((page) => (
                    <SidebarMenuItem key={page.value}>
                      <SidebarMenuButton
                        tooltip={page.label}
                        isActive={activeTab === page.value}
                        onClick={() => handleTabChange(page.value)}
                      >
                        <page.icon className="size-4" />
                        <span>{page.label}</span>
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
              className="justify-start gap-2"
              onClick={openCommandPalette}
            >
              <CommandIcon className="size-4" />
              Command Palette
            </Button>
            <SidebarSeparator />
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Tip: ⌘/Ctrl + K to jump around.</p>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex-1 bg-transparent">
          <div className="flex h-full min-h-0 flex-col">
            <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />
                  <div>
                    <p className="text-sm font-medium">Welcome back</p>
                    <p className="text-xs text-muted-foreground">
                      {pages.find((page) => page.value === activeTab)?.description}
                    </p>
                  </div>
                </div>
                <Menubar className="bg-background/60 backdrop-blur">
                  <MenubarMenu>
                    <MenubarTrigger>Navigate</MenubarTrigger>
                    <MenubarContent>
                      {pages.map((page) => (
                        <MenubarItem
                          key={page.value}
                          onSelect={() => handleTabChange(page.value)}
                        >
                          <page.icon className="size-4" />
                          {page.label}
                        </MenubarItem>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Links</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem asChild>
                        <a
                          href="https://github.com/zx-ma"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="size-4" />
                          GitHub
                          <ExternalLink className="size-3 opacity-70" />
                        </a>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem asChild>
                        <a
                          href="mailto:hello@example.com"
                          className="flex items-center gap-2"
                        >
                          <Mail className="size-4" />
                          Email me
                        </a>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </header>

            <main className="flex flex-1 min-h-0 p-4">
              <ResizablePanelGroup
                className="h-full w-full rounded-xl border bg-background/70 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/50"
                direction="horizontal"
              >
                <ResizablePanel defaultSize={70} minSize={45}>
                  <div className="flex h-full flex-col">
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
                        <TabsContent value="about" className="h-full data-[state=inactive]:hidden">
                          <ScrollArea className="h-full px-4 py-6">
                            <div className="space-y-6">
                              <section className="space-y-2">
                                <h2 className="text-2xl font-semibold">Hello, I’m mzx</h2>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                  Replace this paragraph with your story. Talk about what you’re building,
                                  what you’re learning, and what visitors should explore next.
                                </p>
                              </section>
                              <Separator />
                              <section className="space-y-3">
                                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                  Currently
                                </h3>
                                <ul className="space-y-2 text-sm">
                                  <li>• Experimenting with terminal-inspired web UIs.</li>
                                  <li>• Writing about tools, workflows, and creative coding.</li>
                                  <li>• Exploring declarative window managers like Hyprland/Niri.</li>
                                </ul>
                              </section>
                            </div>
                          </ScrollArea>
                        </TabsContent>
                        <TabsContent value="projects" className="h-full data-[state=inactive]:hidden">
                          <ScrollArea className="h-full px-4 py-6">
                            <div className="space-y-6">
                              <section className="space-y-2">
                                <h2 className="text-2xl font-semibold">Selected Projects</h2>
                                <p className="text-sm text-muted-foreground">
                                  Highlight a few things you’re proud of. Link to live demos or blog posts
                                  for deeper dives.
                                </p>
                              </section>
                              <div className="space-y-4">
                                <article className="rounded-lg border bg-background/60 p-4 shadow-xs">
                                  <h3 className="text-base font-semibold">terminal-ui</h3>
                                  <p className="text-sm text-muted-foreground">
                                    A playful terminal puzzle that unlocks this portfolio experience.
                                  </p>
                                  <Button variant="link" className="px-0" asChild>
                                    <a href="#projects" className="gap-1">
                                      Read more
                                      <ExternalLink className="size-3" />
                                    </a>
                                  </Button>
                                </article>
                                <article className="rounded-lg border bg-background/60 p-4 shadow-xs">
                                  <h3 className="text-base font-semibold">personal-site</h3>
                                  <p className="text-sm text-muted-foreground">
                                    A Vite + React + Tailwind playground for experimenting with motion and UI states.
                                  </p>
                                </article>
                                <article className="rounded-lg border bg-background/60 p-4 shadow-xs">
                                  <h3 className="text-base font-semibold">writing</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Notes on workflow, open source contributions, and daily tooling tweaks.
                                  </p>
                                </article>
                              </div>
                            </div>
                          </ScrollArea>
                        </TabsContent>
                        <TabsContent value="contact" className="h-full data-[state=inactive]:hidden">
                          <ScrollArea className="h-full px-4 py-6">
                            <div className="space-y-6">
                              <section className="space-y-2">
                                <h2 className="text-2xl font-semibold">Stay in touch</h2>
                                <p className="text-sm text-muted-foreground">
                                  Drop a note or follow along where I’m most active.
                                </p>
                              </section>
                              <div className="space-y-4 text-sm">
                                <div className="rounded-lg border bg-background/60 p-4 shadow-xs">
                                  <h3 className="font-semibold">Email</h3>
                                  <p className="text-muted-foreground">hello@example.com</p>
                                </div>
                                <div className="rounded-lg border bg-background/60 p-4 shadow-xs">
                                  <h3 className="font-semibold">GitHub</h3>
                                  <p className="text-muted-foreground">github.com/yourname</p>
                                </div>
                                <div className="rounded-lg border bg-background/60 p-4 shadow-xs">
                                  <h3 className="font-semibold">Newsletter</h3>
                                  <p className="text-muted-foreground">
                                    Share notes, deep dives, or upcoming talks here.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={20} className="border-l">
                  <ScrollArea className="h-full px-4 py-6">
                    <div className="space-y-6">
                      <section className="space-y-2">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          Notes
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Use this panel for quick updates, changelogs, or upcoming events.
                        </p>
                      </section>
                      <Separator />
                      <section className="space-y-3">
                        <h3 className="text-sm font-medium">Writing queue</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Hyprland vs Niri: bringing WM motion to the web.</li>
                          <li>• Building delightful command palettes with shadcn/ui.</li>
                          <li>• Tailwind v4 migration notes.</li>
                        </ul>
                      </section>
                      <Separator />
                      <section className="space-y-3">
                        <h3 className="text-sm font-medium">Now</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Reading: Designing UI Motion Systems.</li>
                          <li>• Listening: Ambient coding playlists.</li>
                          <li>• Working on: polishing this portfolio.</li>
                        </ul>
                      </section>
                      <Separator />
                      <section className="space-y-3">
                        <h3 className="text-sm font-medium">Contact</h3>
                        <Button variant="ghost" className="justify-start gap-2" asChild>
                          <a href="mailto:hello@example.com">
                            <Mail className="size-4" />
                            Say hello
                          </a>
                        </Button>
                        <Button variant="ghost" className="justify-start gap-2" asChild>
                          <a href="https://github.com/zx-ma" target="_blank" rel="noreferrer">
                            <Github className="size-4" />
                            GitHub profile
                          </a>
                        </Button>
                      </section>
                    </div>
                  </ScrollArea>
                </ResizablePanel>
              </ResizablePanelGroup>
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
