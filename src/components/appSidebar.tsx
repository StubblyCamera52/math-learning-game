import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Practice",
    url: "/practice",
  },
  {
    title: "Gamble",
    url: "/gamble"
  },
  // {
  //   title: "Assignments",
  //   url: "/assignment",
  // },
  {
    title: "Shop",
    url: "/shop"
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Math is Fun!</SidebarGroupLabel>
          <SidebarGroupContent>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-10">
                  <Link href={item.url} className="text-xl font-medium">
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupLabel>Made By Gavan ❤️</SidebarGroupLabel>
      </SidebarFooter>
    </Sidebar>
  );
}
