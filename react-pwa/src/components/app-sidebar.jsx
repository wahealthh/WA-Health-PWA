/* eslint-disable react/prop-types */
import {
  Calendar,
  Home,
  Phone,
  Users,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import PropTypes from "prop-types";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import logo from "@/assets/logo-main.png";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Patients",
      url: "/due-patients",
      icon: Users,
      items: [
        {
          title: "Due Patients",
          url: "/due-patients",
        },
        {
          title: "All Patients",
          url: "/due-patients",
        },
        {
          title: "Add Patient",
          url: "/add-patient",
          disabled: true,
        },
      ],
    },
    {
      title: "Calls",
      url: "/call-history",
      icon: Phone,
      items: [
        {
          title: "Call History",
          url: "/call-history",
        },
      ],
    },
    {
      title: "Appointments",
      url: "/appointments",
      icon: Calendar,
      disabled: true,
      items: [
        {
          title: "Today",
          url: "/appointments/today",
          disabled: true,
        },
        {
          title: "Upcoming",
          url: "/appointments/upcoming",
          disabled: true,
        },
        {
          title: "Calendar",
          url: "/appointments/calendar",
          disabled: true,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Help & Support",
      url: "/support",
      icon: HelpCircle,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageSquare,
    },
  ],
};

export function AppSidebar({ userInfo, ...props }) {
  // Create a user object from the userInfo data
  const user = userInfo
    ? {
        name: userInfo.admin?.first_name
          ? `${userInfo.admin.first_name} ${userInfo.admin.last_name || ""}`
          : "User",
        email: userInfo.user?.email || "user@example.com",
        avatar: userInfo.admin?.avatar || "/avatars/default.jpg",
        role: userInfo.user?.role || "Healthcare Professional",
      }
    : {
        name: "Guest User",
        email: "guest@example.com",
        avatar: "/avatars/default.jpg",
      };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex items-center justify-center">
                  <img src={logo} alt="WA Health Logo" className="size-7" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-primary">
                    WA Health
                  </span>
                  <span className="truncate text-xs">Rapid Recall</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

// Define PropTypes for the AppSidebar component
AppSidebar.propTypes = {
  userInfo: PropTypes.shape({
    admin: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
    }),
    user: PropTypes.shape({
      role: PropTypes.string,
    }),
    practice: PropTypes.object,
  }),
};
