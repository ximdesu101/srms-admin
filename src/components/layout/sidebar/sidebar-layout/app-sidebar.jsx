import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    FileUp,
    Logs,
    RouteOff,
    FolderSync,
    ShieldCheck,
    Activity,
    UserRoundCog,
    ChartNoAxesCombined,
    Settings2,
    LogOut,
    Loader2,
    BellElectric,
    FileText,
    FilePlusCorner,
    Send 
} from "lucide-react";

import { NavMain } from "@/components/layout/sidebar/sidebar-layout/nav-main";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';

const navMain = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    {
        title: "User Management",
        url: "#",
        icon: Users,
        items: [
            { title: "Teacher Account", url: "/teacher-accounts" },
            { title: "Staff Account", url: "/staff" },
        ],

    },
    { title: "School Form", url: "/school-forms", icon: FileText },
    { title: "Document Requests", url: "/document-requests", icon: FilePlusCorner },
    {
        title: "Document Submission",
        url: "#",
        icon: Send,
        items: [
            { title: "Submission Request", url: "/submission-requests" },
            { title: "Submission Approval", url: "/submission-approvals" },
        ],
    },
    { title: "Reports", url: "#", icon: ChartNoAxesCombined },
    { title: "Audit Logs", url: "/activity-logs", icon: Logs },
];

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent className="mt-15">
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}