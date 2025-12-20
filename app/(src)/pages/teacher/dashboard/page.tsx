"use client";

import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/app/(src)/components/layout/DashboardLayout";
import { StatsCard } from "@/app/(src)/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Users,
  Calendar
} from "lucide-react";

const mockAssignedProposals = [
  { id: "1", title: "AI-Powered Student Performance Analytics", students: ["John Doe", "Jane Smith"], status: "pending_review", submittedAt: "2024-01-15" },
  { id: "2", title: "Blockchain Certificate Verification", students: ["Alice Brown", "Bob Wilson"], status: "revision_submitted", submittedAt: "2024-01-14" },
];

export default function TeacherDashboardPage() {
  const router = useRouter();

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground text-lg text-balance">
            Review and manage assigned student proposals.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Pending Review" value={2} icon={Clock} trend={{ value: 2, isPositive: false }} />
          <StatsCard title="Revisions" value={1} icon={AlertTriangle} />
          <StatsCard title="Approved" value={12} icon={CheckCircle2} trend={{ value: 15, isPositive: true }} />
          <StatsCard title="Total Assigned" value={15} icon={FileText} />
        </div>

        {/* Proposals Table-Style List */}
        <Card className="border-none shadow-xl shadow-primary/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Submissions</CardTitle>
              <CardDescription>Proposals waiting for your feedback</CardDescription>
            </div>
            <Button 
                variant="outline" 
                className="rounded-full border-primary/20 text-primary"
                onClick={() => router.push("/teacher/proposals")}
            >
                View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAssignedProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="group flex items-center justify-between p-4 border rounded-2xl hover:bg-primary/5 transition-all cursor-pointer"
                onClick={() => router.push(`/teacher/proposals/${proposal.id}/review`)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{proposal.title}</h4>
                      <Badge className="bg-amber-100 text-amber-700 border-none capitalize">
                        {proposal.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 font-medium">
                      <span className="flex items-center gap-1"><Users className="h-4 w-4" />{proposal.students.join(", ")}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{proposal.submittedAt}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}