import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarFooter,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Home",
        url: "#",
        icon: "Home",
    },
    {
        title: "Profile",
        url: "/profile",
        icon: "Inbox",
    },
    {
        title: "Assignments",
        url: "/assignment",
        icon: "Calendar",
    },
    {
        title: "Practice",
        url: "/practice",
        icon: "Search",
    },
    {
        title: "Settings",
        url: "/settings",
        icon: "Settings",
    },
]


export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Math is Fun!</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <span>{item.title}</span>
                                    </a>
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
    )
}