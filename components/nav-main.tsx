"use client"

import { BarChartIcon, BusFrontIcon, CarFrontIcon, CarIcon, ClipboardListIcon, FileAxis3D, LayoutDashboardIcon, MailIcon, Package2Icon, PlusCircleIcon, RouteIcon, SettingsIcon, UsersIcon, type LucideIcon } from "lucide-react"

import { Button } from '@/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useRouter } from "next/navigation"

export function NavMain() {


  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Routes",
      url: "/routes",
      icon: RouteIcon,
    },
    {
      title: "Buses",
      url: "/buses",
      icon: BusFrontIcon,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: ClipboardListIcon,
    },
    {
      title: "Packages (Parcels)",
      url: "/packages",
      icon: Package2Icon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },

    {
      title: "Team (Users)",
      url: "/team",
      icon: UsersIcon,
    },
    {
      title: "Configurations",
      url: "/configurations",
      icon: CarFrontIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
  ];

  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <MailIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (

            <SidebarMenuItem key={item.title}>

              <SidebarMenuButton tooltip={item.title} onClick={() => router.replace(item.url)}>
                {item.icon && <item.icon />}
                {item.title}
              </SidebarMenuButton>

            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
