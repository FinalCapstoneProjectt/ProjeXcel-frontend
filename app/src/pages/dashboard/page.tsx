"use client";

import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/app/src/components/layout/DashboardLayout";
import { StatsCard } from "@/app/src/components/dashboard/StatsCard";
import { ProposalCard } from "@/app/src/components/dashboard/ProposalCard";
// Fixed these UI imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Plus,
  Bell,
  ArrowRight,
} from "lucide-react";

const stats = [
  { title: "Total Proposals", value: 4, icon: FileText, description: "All time submissions" },
  { title: "Approved", value: 2, icon: CheckCircle, trend: { value: 50, isPositive: true } },
  { title: "Pending Review", value: 1, icon: Clock, description: "Awaiting feedback" },
  { title: "Needs Revision", value: 1, icon: AlertCircle, description: "Action required" },
];

const recentProposals = [
  {
    id: "1",
    title: "AI-Powered Analytics",
    description: "Machine learning system for performance prediction.",
    status: "approved" as const,
    date: "Dec 15, 2024",
    teamSize: 4,
    department: "Computer Science",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <DashboardLayout role="student">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-in fade-in slide-in-from-bottom-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">Here&apos;s an overview of your project proposals.</p>
        </div>
        
        <Button 
          className="rounded-full shadow-lg shadow-primary/20" 
          onClick={() => router.push("/dashboard/proposals/new")}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Proposal
        </Button>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Proposals</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full" 
              onClick={() => router.push("/dashboard/proposals")}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4">
            {recentProposals.map((proposal) => (
              <ProposalCard key={proposal.id} {...proposal} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2 text-primary">
                  <Bell className="h-4 w-4" />
                  Notifications
                </CardTitle>
                <Badge variant="secondary" className="text-xs">3 new</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full rounded-full"
                onClick={() => router.push("/dashboard/notifications")}
              >
                View all
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}