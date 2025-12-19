"use client";

import { DashboardLayout } from "@/app/src/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  Shield, 
  Trash2, 
  XCircle 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@uni.edu", role: "student", status: "active" },
  { id: "2", name: "Dr. Sarah Johnson", email: "sarah@uni.edu", role: "teacher", status: "active" },
  { id: "3", name: "Admin User", email: "admin@uni.edu", role: "admin", status: "active" },
  { id: "4", name: "Jane Smith", email: "jane@uni.edu", role: "student", status: "inactive" },
];

export default function UserManagementPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground text-lg">Manage system users, roles, and account statuses.</p>
          </div>
          <Button className="rounded-full bg-primary hover:bg-primary/90 gap-2 shadow-lg shadow-primary/20 h-11 px-6">
            <UserPlus className="h-4 w-4" />
            Add New User
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-11 rounded-full border-primary/10 bg-muted/30 focus-visible:ring-primary h-11" 
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] rounded-full border-primary/10 bg-muted/30 h-11">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="teacher">Teachers</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-full h-11 border-primary/10">
              Export CSV
            </Button>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {mockUsers.map((user) => (
            <Card key={user.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-card/50 backdrop-blur">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-background group-hover:border-primary/20 transition-colors">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Role Badge */}
                  <Badge 
                    variant="outline" 
                    className={`rounded-md capitalize px-3 py-1 text-[10px] tracking-wider border-none font-bold ${
                      user.role === "admin" 
                        ? "bg-amber-100 text-amber-700" 
                        : user.role === "teacher" 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {user.role}
                  </Badge>

                  {/* Status Badge */}
                  <div className="hidden sm:flex items-center gap-2 w-24">
                    {user.status === "active" ? (
                      <>
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold text-emerald-600 capitalize">{user.status}</span>
                      </>
                    ) : (
                      <>
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground capitalize">{user.status}</span>
                      </>
                    )}
                  </div>

                  {/* Actions Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                        <Shield className="h-4 w-4 text-primary" />
                        Change User Role
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 text-destructive focus:text-destructive cursor-pointer">
                        <XCircle className="h-4 w-4" />
                        Deactivate Account
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 text-destructive focus:text-destructive cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                        Delete Permanently
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-center pt-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{mockUsers.length}</span> of 245 total users
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}