"use client";

import { useRouter } from "next/navigation"; // Next.js Router hook
import { Header } from "@/app/src/components/layout/Header";
import { Footer } from "@/app/src/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Star, Calendar, Users, ExternalLink } from "lucide-react";

// Mock data (Truncated for brevity)
const publicProjects = [
  {
    id: "1",
    title: "AI-Powered Student Performance Analytics",
    description: "A machine learning system that analyzes student academic performance...",
    department: "Computer Science",
    year: "2024",
    team: ["Alice Chen", "Bob Wilson"],
    rating: 4.8,
    tags: ["Machine Learning", "Education"],
  },
  // ... (rest of your mock data)
];

const departments = ["All Departments", "Computer Science", "Engineering", "Psychology", "Digital Media", "Information Systems"];
const years = ["All Years", "2024", "2023", "2022"];

export default function ProjectsPage() {
  const router = useRouter(); // Initialize the router

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Grid Pattern */}
        <section className="relative border-b bg-muted/30 py-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
          
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Public Project Archive
              </h1>
              <p className="mt-4 text-lg text-muted-foreground text-balance">
                Explore approved student projects from across departments. 
                Get inspired by innovative solutions and academic excellence.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mx-auto mt-10 max-w-4xl">
              <div className="flex flex-col gap-4 sm:flex-row p-2 bg-white rounded-2xl shadow-xl shadow-primary/5 border">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search projects..." 
                    className="pl-9 rounded-xl border-none bg-muted/50 focus-visible:ring-primary"
                  />
                </div>
                <Select defaultValue="All Departments">
                  <SelectTrigger className="w-full sm:w-56 rounded-xl border-none bg-muted/50">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="All Years">
                  <SelectTrigger className="w-full sm:w-36 rounded-xl border-none bg-muted/50">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{publicProjects.length}</span> projects
              </p>
              <Button variant="outline" size="sm" className="rounded-full px-4">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {publicProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="animate-in fade-in slide-in-from-bottom-4 flex flex-col group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-primary/10"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary border-none">
                        {project.department}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span>{project.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2 line-clamp-2 text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] font-medium rounded-md">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="h-3.5 w-3.5" />
                        {project.year}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Users className="h-3.5 w-3.5" />
                        {project.team.length} members
                      </span>
                    </div>

                    {/* Programme-based Navigation via onClick */}
                    <Button 
                      variant="default" 
                      className="w-full rounded-full gap-2 group-hover:shadow-lg transition-all"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      View Project Details
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button variant="outline" size="lg" className="rounded-full px-10 border-primary/20 hover:bg-primary/5">
                Load More Projects
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}