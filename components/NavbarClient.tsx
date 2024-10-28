"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { createClient } from "@/utils/supabase/client";

export default function NavbarClient() {
  const supabase = createClient();
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 bg-background border-b">
      <nav className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl">Konstrakt</h1>
        </div>

        <NavigationMenu className="hidden lg:flex gap-6 text-sm font-medium">
          <NavigationMenuList>
            {/* Post Jobs */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Jobs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] p-2">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/client/create-job"
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      prefetch={false}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Post a Job
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Create a new job listing to hire freelancers.
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/jobs/manage"
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      prefetch={false}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Manage Jobs
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        View and edit your posted jobs.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Search Freelancers */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Freelancers</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] p-2">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/freelancers/search"
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      prefetch={false}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Search Freelancers
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Browse freelancers to find the right match.
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/client/proposals"
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      prefetch={false}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Review Applications
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        View proposals from freelancers who applied to your
                        jobs.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Manage Projects */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[300px] p-2">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/projects/active"
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      prefetch={false}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Active Projects
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Track your ongoing freelance projects.
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link
                      href="/projects/finished"
                      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      prefetch={false}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Finished Projects
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        View completed freelance projects.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Messages */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/chat"
                className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                Messages
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Logout Button */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            variant="outline"
            className="hidden md:inline-flex"
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}
