"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/(src)/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  MessageSquare,
  Upload,
  CheckCircle,
  UserCog,
  Building2,
  Globe,
  GraduationCap,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type UserRole = "student" | "teacher" | "admin";

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = {
  student: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Proposals", href: "/dashboard/proposals", icon: FileText },
    { name: "Group Members", href: "/dashboard/group", icon: Users },
    { name: "Discussions", href: "/dashboard/discussions", icon: MessageSquare },
    { name: "Documents", href: "/dashboard/documents", icon: Upload },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
  teacher: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Assigned Proposals", href: "/dashboard/proposals", icon: FileText },
    { name: "Reviews", href: "/dashboard/reviews", icon: CheckCircle },
    { name: "Discussions", href: "/dashboard/discussions", icon: MessageSquare },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: UserCog },
    { name: "Departments", href: "/admin/departments", icon: Building2 },
    { name: "Assignments", href: "/admin/assignments", icon: Users },
    { name: "Public Projects", href: "/projects", icon: Globe },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ],
};

// IMPORTANT: The "export" keyword must be here
export function DashboardSidebar({ role, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const items = navigationItems[role] || navigationItems.student;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-card transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b p-4 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">Project Hub</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
            {items.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start gap-2 rounded-full" asChild>
              <Link href="/">
                <Globe className="h-4 w-4" />
                View Public Site
              </Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}