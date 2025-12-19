"use client";

import { useState } from "react";
import { Header } from "./Header";
import { DashboardSidebar } from "@/app/src/components/layout/DashboardSidebar";

type UserRole = "student" | "teacher" | "admin";

interface DashboardLayoutProps {
  children: React.ReactNode;
  // In Next.js layouts, role is often determined by auth logic, 
  // but we'll keep the prop for compatibility.
  role?: UserRole;
}

export function DashboardLayout({ children, role = "student" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* 
        Header usually contains the user profile and the 
        mobile menu trigger 
      */}
      <Header 
        showMenuButton 
        onMenuClick={() => setSidebarOpen(true)} 
      />

      {/* 
        The Sidebar is usually hidden on mobile (controlled by isOpen)
        and fixed on desktop (lg:block)
      */}
      <DashboardSidebar 
        role={role} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* 
        The sidebar width is 64 (16rem), so we pad the left side 
        on large screens to prevent content overlap.
      */}
      <main className="lg:pl-64 transition-all duration-300">
        <div className="container max-w-7xl py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}