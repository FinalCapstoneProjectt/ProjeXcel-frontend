"use client";

import { useState } from "react";
import { DashboardLayout } from "@/app/(src)/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Building2, 
  Plus, 
  Users, 
  BookOpen,
  GraduationCap,
  Edit,
  Trash2,
  Search,
  MoreHorizontal
} from "lucide-react";
import { useToast } from "@/app/(src)/hooks/use-toast";

// Mock Data
const mockDepartments = [
  { 
    id: "1", 
    name: "Computer Science", 
    code: "CSE",
    description: "Department of Computer Science and Engineering",
    headName: "Dr. Sarah Johnson",
    studentsCount: 245,
    teachersCount: 12,
    projectsCount: 45,
  },
  { 
    id: "2", 
    name: "Software Engineering", 
    code: "SE",
    description: "Department of Software Engineering",
    headName: "Prof. Michael Chen",
    studentsCount: 180,
    teachersCount: 8,
    projectsCount: 32,
  },
  { 
    id: "3", 
    name: "Information Technology", 
    code: "IT",
    description: "Department of Information Technology",
    headName: "Dr. Emily Davis",
    studentsCount: 156,
    teachersCount: 7,
    projectsCount: 28,
  },
  { 
    id: "4", 
    name: "Electrical Engineering", 
    code: "EE",
    description: "Department of Electrical and Computer Engineering",
    headName: "Prof. David Park",
    studentsCount: 198,
    teachersCount: 10,
    projectsCount: 35,
  },
];

export default function DepartmentsPage() {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedDepartment, setSelectedDepartment] = useState<typeof mockDepartments[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    headName: "",
  });

  const handleOpenDialog = (mode: "add" | "edit", dept?: typeof mockDepartments[0]) => {
    setDialogMode(mode);
    if (mode === "edit" && dept) {
      setSelectedDepartment(dept);
      setFormData({
        name: dept.name,
        code: dept.code,
        description: dept.description,
        headName: dept.headName,
      });
    } else {
      setFormData({ name: "", code: "", description: "", headName: "" });
    }
    setShowDialog(true);
  };

  const handleSave = () => {
    toast({
      title: dialogMode === "add" ? "Department Created" : "Department Updated",
      description: `${formData.name} has been ${dialogMode === "add" ? "created" : "updated"} successfully.`,
    });
    setShowDialog(false);
  };

  const handleDelete = (dept: typeof mockDepartments[0]) => {
    toast({
      title: "Department Deleted",
      description: `${dept.name} has been removed.`,
    });
  };

  const filteredDepartments = mockDepartments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
            <p className="text-muted-foreground">Manage university departments and their configurations.</p>
          </div>
          <Button className="rounded-full gap-2" onClick={() => handleOpenDialog("add")}>
            <Plus className="h-4 w-4" />
            Add Department
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search departments..." 
            className="pl-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Total Departments
              </CardDescription>
              <CardTitle className="text-3xl">{mockDepartments.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-blue-50/50 border-blue-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-700 font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> Total Students
              </CardDescription>
              <CardTitle className="text-3xl text-blue-900">
                {mockDepartments.reduce((acc, d) => acc + d.studentsCount, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-emerald-50/50 border-emerald-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-emerald-700 font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Total Teachers
              </CardDescription>
              <CardTitle className="text-3xl text-emerald-900">
                {mockDepartments.reduce((acc, d) => acc + d.teachersCount, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-purple-50/50 border-purple-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-700 font-medium flex items-center gap-2">
                <Users className="h-4 w-4" /> Active Projects
              </CardDescription>
              <CardTitle className="text-3xl text-purple-900">
                {mockDepartments.reduce((acc, d) => acc + d.projectsCount, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Departments Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredDepartments.map((dept) => (
            <Card key={dept.id} className="hover:shadow-md transition-all hover:border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{dept.code}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleOpenDialog("edit", dept)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 rounded-full text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(dept)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="mt-2">{dept.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Department Head</span>
                    <span className="font-medium">{dept.headName}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{dept.studentsCount}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">{dept.teachersCount}</p>
                      <p className="text-xs text-muted-foreground">Teachers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{dept.projectsCount}</p>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{dialogMode === "add" ? "Add Department" : "Edit Department"}</DialogTitle>
            <DialogDescription>
              {dialogMode === "add" 
                ? "Create a new university department." 
                : "Update department information."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-medium">Department Name</Label>
                <Input 
                  placeholder="e.g., Computer Science"
                  className="rounded-xl"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-medium">Code</Label>
                <Input 
                  placeholder="e.g., CSE"
                  className="rounded-xl"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Department Head</Label>
              <Input 
                placeholder="e.g., Dr. John Smith"
                className="rounded-xl"
                value={formData.headName}
                onChange={(e) => setFormData({...formData, headName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Description</Label>
              <Textarea 
                placeholder="Brief description of the department..."
                className="rounded-xl resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button className="rounded-full" onClick={handleSave}>
              {dialogMode === "add" ? "Create Department" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
