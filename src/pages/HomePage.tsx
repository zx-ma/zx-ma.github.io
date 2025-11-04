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
  SidebarRail,
  SidebarInput,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Command as CommandIcon,
  Github,
  Mail,
  Rss,
  User,
} from "lucide-react";

const pages = [
  {
    value: "about",
    label: "About",
    description: "Who I am and what I'm exploring.",
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
              placeholder="Filter pages"
              aria-label="Filter pages"
              className="group-data-[collapsible=icon]:hidden"
            />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Highlights</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Email">
                      <a href="mailto:zhexuanma@gmail.com" className="gap-2">
                        <Mail className="size-4" />
                        Email
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="GitHub">
                      <a
                        href="https://github.com/zx-ma"
                        target="_blank"
                        rel="noreferrer"
                        className="gap-2"
                      >
                        <Github className="size-4" />
                        GitHub
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Projects">
                      <a href="#projects" className="gap-2">
                        <Briefcase className="size-4" />
                        Projects
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Latest Writing</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Hyprland motion system">
                      <a href="/blog/hyprland-motion" className="gap-2">
                        <Rss className="size-4" />
                        Hyprland motion system
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Building command palettes">
                      <a href="/blog/command-palette" className="gap-2">
                        <Rss className="size-4" />
                        Building command palettes
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
            <SidebarFooter className="gap-2">
              <Button
                variant="outline"
                size="sm"
                className="justify-start gap-2 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                onClick={openCommandPalette}
              >
                <CommandIcon className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">Command Palette</span>
              </Button>
              <SidebarSeparator />
              <div className="space-y-1 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
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
                      {
                        pages.find((page) => page.value === activeTab)
                          ?.description
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Button variant="ghost" size="sm" asChild>
                    <a href="mailto:zhexuanma@gmail.com" className="gap-2">
                      <Mail className="size-4" />
                      Email
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href="https://github.com/zx-ma"
                      target="_blank"
                      rel="noreferrer"
                      className="gap-2"
                    >
                      <Github className="size-4" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </header>

            <main className="flex flex-1 min-h-0 p-4">
              <div className="flex h-full w-full flex-col rounded-xl border bg-background/70 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/50">
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
                      <ScrollArea className="h-full px-4 py-6">
                        <div className="space-y-6">
                          <section className="space-y-2">
                            <h2 className="text-2xl font-semibold">
                              Hello, I'm mzx
                            </h2>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              Replace this paragraph with your story. Talk about
                              what you're building, what you're learning, and
                              what visitors should explore next.
                            </p>
                          </section>
                          <Separator />
                          <section className="space-y-3">
                            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                              Currently
                            </h3>
                            <ul className="space-y-2 text-sm">
                              <li>
                                • Experimenting with terminal-inspired web UIs.
                              </li>
                              <li>
                                • Writing about tools, workflows, and creative
                                coding.
                              </li>
                              <li>
                                • Exploring declarative window managers like
                                Hyprland/Niri.
                              </li>
                            </ul>
                          </section>
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent
                      value="projects"
                      className="h-full data-[state=inactive]:hidden"
                    >
                      <ScrollArea className="h-full px-4 py-6">
                        <div className="space-y-6">
                          <section className="space-y-2">
                            <h2 className="text-2xl font-semibold">
                              Selected Projects
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Highlight a few things you're proud of. Link to
                              live demos or blog posts for deeper dives.
                            </p>
                          </section>
                          <div className="space-y-4">
                            <article className="rounded-lg border bg-background/60 p-4 shadow-xs">
                              <h3 className="text-base font-semibold">
                                terminal-ui
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                A playful terminal puzzle that unlocks this
                                portfolio experience.
                              </p>
                            </article>
                            <article className="rounded-lg border bg-background/60 p-4 shadow-xs">
                              <h3 className="text-base font-semibold">
                                personal-site
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                A Vite + React + Tailwind playground for
                                experimenting with motion and UI states.
                              </p>
                            </article>
                            <article className="rounded-lg border bg-background/60 p-4 shadow-xs">
                              <h3 className="text-base font-semibold">
                                writing
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Notes on workflow, open source contributions,
                                and daily tooling tweaks.
                              </p>
                            </article>
                          </div>
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent
                      value="contact"
                      className="h-full data-[state=inactive]:hidden"
                    >
                      <ScrollArea className="h-full px-4 py-6">
                        <div className="space-y-6">
                          <section className="space-y-2">
                            <h2 className="text-2xl font-semibold">
                              Stay in touch
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Drop a note or follow along where I'm most active.
                            </p>
                          </section>
                          <div className="space-y-4 text-sm">
                            <div className="rounded-lg border bg-background/60 p-4 shadow-xs">
                              <h3 className="font-semibold">Email</h3>
                              <p className="text-muted-foreground">
                                hello@example.com
                              </p>
                            </div>
                            <div className="rounded-lg border bg-background/60 p-4 shadow-xs">
                              <h3 className="font-semibold">GitHub</h3>
                              <p className="text-muted-foreground">
                                github.com/yourname
                              </p>
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
