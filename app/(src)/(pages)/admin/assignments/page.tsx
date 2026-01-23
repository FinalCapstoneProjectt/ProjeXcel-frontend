'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/app/(src)/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  BookOpen,
  GraduationCap,
  Link2,
  Unlink,
  Building2,
} from 'lucide-react';
import { useToast } from '@/app/(src)/hooks/use-toast';

// Mock Data - Teachers
const mockTeachers = [
  {
    id: 't1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    assignedTeams: 5,
    maxCapacity: 8,
  },
  {
    id: 't2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    department: 'Computer Science',
    assignedTeams: 7,
    maxCapacity: 8,
  },
  {
    id: 't3',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@university.edu',
    department: 'Software Engineering',
    assignedTeams: 3,
    maxCapacity: 6,
  },
  {
    id: 't4',
    name: 'Prof. David Park',
    email: 'david.park@university.edu',
    department: 'Information Technology',
    assignedTeams: 4,
    maxCapacity: 6,
  },
];

// Mock Data - Teams
const mockTeams = [
  {
    id: 'g1',
    name: 'Team Alpha',
    leader: 'John Doe',
    members: 4,
    department: 'Computer Science',
    advisor: 'Dr. Sarah Johnson',
    status: 'assigned',
  },
  {
    id: 'g2',
    name: 'Team Beta',
    leader: 'Alice Brown',
    members: 3,
    department: 'Computer Science',
    advisor: null,
    status: 'unassigned',
  },
  {
    id: 'g3',
    name: 'Team Gamma',
    leader: 'Bob Wilson',
    members: 5,
    department: 'Software Engineering',
    advisor: 'Dr. Emily Davis',
    status: 'assigned',
  },
  {
    id: 'g4',
    name: 'Team Delta',
    leader: 'Carol Lee',
    members: 3,
    department: 'Information Technology',
    advisor: null,
    status: 'unassigned',
  },
  {
    id: 'g5',
    name: 'Team Epsilon',
    leader: 'Mike Johnson',
    members: 4,
    department: 'Computer Science',
    advisor: 'Prof. Michael Chen',
    status: 'assigned',
  },
];

export default function AssignmentsPage() {
  const { toast } = useToast();
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<
    (typeof mockTeams)[0] | null
  >(null);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const unassignedTeams = mockTeams.filter((t) => t.status === 'unassigned');
  const assignedTeams = mockTeams.filter((t) => t.status === 'assigned');

  const filteredTeams = mockTeams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || team.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAssign = (team: (typeof mockTeams)[0]) => {
    setSelectedTeam(team);
    setSelectedTeacher('');
    setShowAssignDialog(true);
  };

  const confirmAssignment = () => {
    if (!selectedTeam || !selectedTeacher) return;

    const teacher = mockTeachers.find((t) => t.id === selectedTeacher);
    toast({
      title: 'Advisor Assigned',
      description: `${teacher?.name} has been assigned as advisor for ${selectedTeam.name}.`,
    });
    setShowAssignDialog(false);
  };

  const handleUnassign = (team: (typeof mockTeams)[0]) => {
    toast({
      title: 'Advisor Removed',
      description: `${team.advisor} has been unassigned from ${team.name}.`,
    });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Advisor Assignments
            </h1>
            <p className="text-muted-foreground">
              Assign faculty advisors to student teams.
            </p>
          </div>
          <Button
            className="rounded-full gap-2"
            onClick={() => setShowAssignDialog(true)}
          >
            <Link2 className="h-4 w-4" />
            New Assignment
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-blue-50/50 border-blue-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-700 font-medium flex items-center gap-2">
                <Users className="h-4 w-4" /> Total Teams
              </CardDescription>
              <CardTitle className="text-3xl text-blue-900">
                {mockTeams.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-emerald-50/50 border-emerald-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-emerald-700 font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> Assigned
              </CardDescription>
              <CardTitle className="text-3xl text-emerald-900">
                {assignedTeams.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-amber-50/50 border-amber-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-amber-700 font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" /> Unassigned
              </CardDescription>
              <CardTitle className="text-3xl text-amber-900">
                {unassignedTeams.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-purple-50/50 border-purple-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-700 font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Advisors
              </CardDescription>
              <CardTitle className="text-3xl text-purple-900">
                {mockTeachers.length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Teacher Workload Overview */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Advisor Workload
            </CardTitle>
            <CardDescription>
              Current team assignments per advisor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mockTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {teacher.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{teacher.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {teacher.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Teams</span>
                    <Badge
                      variant={
                        teacher.assignedTeams >= teacher.maxCapacity
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {teacher.assignedTeams} / {teacher.maxCapacity}
                    </Badge>
                  </div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        teacher.assignedTeams >= teacher.maxCapacity
                          ? 'bg-red-500'
                          : teacher.assignedTeams >= teacher.maxCapacity * 0.75
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                      }`}
                      style={{
                        width: `${(teacher.assignedTeams / teacher.maxCapacity) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teams List */}
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">Student Teams</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search teams..."
                  className="pl-10 rounded-full w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] rounded-full">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredTeams.map((team) => (
              <Card
                key={team.id}
                className="hover:shadow-md transition-all hover:border-primary/20"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{team.name}</h4>
                          <Badge
                            variant={
                              team.status === 'assigned'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {team.status === 'assigned'
                              ? 'Assigned'
                              : 'Unassigned'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            Leader: {team.leader}
                          </span>
                          <span>•</span>
                          <span>{team.members} members</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {team.department}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {team.advisor ? (
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {team.advisor}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Advisor
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full text-red-600 border-red-200 hover:bg-red-50 gap-1"
                            onClick={() => handleUnassign(team)}
                          >
                            <Unlink className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="rounded-full gap-1"
                          onClick={() => handleAssign(team)}
                        >
                          <Link2 className="h-4 w-4" />
                          Assign Advisor
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Assign Advisor</DialogTitle>
            <DialogDescription>
              {selectedTeam
                ? `Select an advisor for ${selectedTeam.name}`
                : 'Select a team and advisor to create an assignment'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {!selectedTeam && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Team</label>
                <Select
                  onValueChange={(id) =>
                    setSelectedTeam(mockTeams.find((t) => t.id === id) || null)
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose a team..." />
                  </SelectTrigger>
                  <SelectContent>
                    {unassignedTeams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name} - {team.leader}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Advisor</label>
              <Select
                value={selectedTeacher}
                onValueChange={setSelectedTeacher}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Choose an advisor..." />
                </SelectTrigger>
                <SelectContent>
                  {mockTeachers.map((teacher) => (
                    <SelectItem
                      key={teacher.id}
                      value={teacher.id}
                      disabled={teacher.assignedTeams >= teacher.maxCapacity}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{teacher.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {teacher.assignedTeams}/{teacher.maxCapacity}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTeacher && (
              <div className="p-4 rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {mockTeachers
                        .find((t) => t.id === selectedTeacher)
                        ?.name.split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {mockTeachers.find((t) => t.id === selectedTeacher)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {
                        mockTeachers.find((t) => t.id === selectedTeacher)
                          ?.department
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setShowAssignDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-full"
              onClick={confirmAssignment}
              disabled={!selectedTeam || !selectedTeacher}
            >
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
