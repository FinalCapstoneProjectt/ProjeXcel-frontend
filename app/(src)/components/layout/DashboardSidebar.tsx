"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Users,
  Settings,
  MessageSquare,
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
    // FIXED: Removed '/pages' prefix. Assuming your routes are app/teacher/dashboard/page.tsx
    { name: "Dashboard", href: "/pages/teacher/dashboard", icon: LayoutDashboard },
    { name: "Assigned Proposals", href: "/pages/teacher/assigned-proposals", icon: FileText },
    { name: "Documentation Review", href: "/pages/teacher/documentation-review", icon: Upload },
    { name: "Settings", href: "/teacher/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: UserCog },
    { name: "Departments", href: "/admin/departments", icon: Building2 },
    { name: "Assignments", href: "/admin/assignments", icon: Users },
    { name: "Public Projects", href: "/projects", icon: Globe },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ],
};

export function DashboardSidebar({ role, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  // Fallback to student if role is undefined or invalid
  const items = navigationItems[role] || navigationItems.student;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-card transition-transform duration-300 lg:translate-x-0 shadow-lg lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile Header (Only visible inside sidebar on mobile) */}
          <div className="flex items-center justify-between border-b p-4 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
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
              // Check active state more loosely to highlight 'Assigned Proposals' even when in 'Assigned Proposals/1/review'
              const isActive = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/teacher/dashboard" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => { 
                    // Close sidebar on mobile when a link is clicked
                    if (window.innerWidth < 1024) onClose(); 
                  }}
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