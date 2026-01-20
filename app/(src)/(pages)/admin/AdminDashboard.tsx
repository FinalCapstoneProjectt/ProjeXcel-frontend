import { DashboardLayout } from "@/app/(src)/components/layout/DashboardLayout";
import { StatsCard } from "@/app/(src)/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, FileText, Shield, Eye, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | University Project Hub",
  description: "System governance, user management, and department oversight.",
};

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            System governance and global platform management.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StatsCard 
            title="Total Users" 
            value={245} 
            icon={Users} 
            trend={{ value: 12, isPositive: true }} 
          />
          <StatsCard 
            title="Departments" 
            value={8} 
            icon={Building2} 
          />
          <StatsCard 
            title="Active Projects" 
            value={67} 
            icon={FileText} 
          />
          <StatsCard 
            title="Public Projects" 
            value={34} 
            icon={Eye} 
          />
        </div>

        {/* Management Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {/* User Management Card */}
          <Card className="border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">User Management</CardTitle>
              </div>
              <CardDescription>
                Review registration requests, manage roles, and update user accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full rounded-full gap-2" asChild>
                <Link href="/admin/users">
                  Manage Users
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Department Card */}
          <Card className="border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Departments</CardTitle>
              </div>
              <CardDescription>
                Configure university departments and manage faculty hierarchies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full rounded-full border-primary/20 hover:bg-primary/5 gap-2" asChild>
                <Link href="/admin/departments">
                  Manage Departments
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Assignments Card */}
          <Card className="border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Assignments</CardTitle>
              </div>
              <CardDescription>
                Assign supervisors to student teams and review distribution metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full rounded-full border-primary/20 hover:bg-primary/5 gap-2" asChild>
                <Link href="/admin/assignments">
                  Manage Assignments
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Settings Bar */}
        <div className="bg-muted/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-bold">System Configuration</p>
              <p className="text-sm text-muted-foreground">Global settings, API keys, and maintenance controls.</p>
            </div>
          </div>
          <Button variant="ghost" className="rounded-full px-6 bg-white shadow-sm" asChild>
            <Link href="/admin/settings">Open Settings</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}