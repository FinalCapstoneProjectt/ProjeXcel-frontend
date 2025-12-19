"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return toast({
        variant: "destructive",
        title: "Passwords mismatch",
        description: "Please make sure both passwords match.",
      });
    }

    if (!formData.role || !formData.department) {
      return toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select your role and department.",
      });
    }

    setIsLoading(true);

    // Simulate signup logic
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Welcome to Project Hub. Please sign in with your new account.",
      });
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Decorative Sidebar (Emerald/Teal Gradient) */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center bg-primary relative overflow-hidden">
        {/* The Grid Pattern from your screenshot */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="relative px-12 text-primary-foreground max-w-lg mx-auto">
          <div className="space-y-8">
            <h2 className="text-5xl font-extrabold tracking-tight">Join the <br/>Community</h2>
            <ul className="space-y-6">
              {[
                "Create and submit project proposals",
                "Collaborate with team members",
                "Get AI-powered feedback",
                "Track progress in real-time",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 group">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <span className="text-lg font-medium opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Right side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="mb-10 flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Project Hub</span>
          </Link>

          <Card className="border-none shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Sign up</CardTitle>
              <CardDescription>
                Start your academic project journey today
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-9 rounded-full h-11"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">University Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@university.edu"
                      className="pl-9 rounded-full h-11"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select 
                      disabled={isLoading}
                      onValueChange={(value: string) => handleChange("role", value)}
                    >
                      <SelectTrigger className="rounded-full h-11">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select 
                      disabled={isLoading}
                      onValueChange={(value: string) => handleChange("department", value)}
                    >
                      <SelectTrigger className="rounded-full h-11">
                        <SelectValue placeholder="Dept" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="eng">Engineering</SelectItem>
                        <SelectItem value="bus">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9 rounded-full h-11"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9 rounded-full h-11"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full rounded-full h-12 text-base font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Sign Up
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="font-bold text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}