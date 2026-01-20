"use client";

import { DashboardLayout } from "@/app/(src)/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, UserPlus, Clock } from "lucide-react";

export default function GroupManagementPage() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Collaborate with your project partners.</p>
          </div>
          <Button className="rounded-full gap-2 h-11 px-6 shadow-lg shadow-primary/10">
            <UserPlus className="h-4 w-4" /> Invite Partner
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-sm bg-primary/5 text-primary">
            <CardContent className="pt-6 flex items-center gap-4">
              <Users className="h-8 w-8" />
              <div><p className="text-2xl font-bold">3 / 5</p><p className="text-xs font-medium uppercase tracking-wider">Members</p></div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-amber-50 text-amber-600">
            <CardContent className="pt-6 flex items-center gap-4">
              <Clock className="h-8 w-8" />
              <div><p className="text-2xl font-bold">1</p><p className="text-xs font-medium uppercase tracking-wider">Pending</p></div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl">Active Members</h3>
          {["John Doe (Leader)", "Jane Smith", "Mike Johnson"].map((name, i) => (
            <Card key={name} className="border-none shadow-sm group hover:bg-primary/5 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="border-2 border-background shadow-sm">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold group-hover:text-primary transition-colors">{name}</p>
                    <p className="text-xs text-muted-foreground">student@university.edu</p>
                  </div>
                </div>
                <Badge className={i === 0 ? "bg-primary" : "bg-muted text-muted-foreground"}>
                  {i === 0 ? "Leader" : "Member"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}