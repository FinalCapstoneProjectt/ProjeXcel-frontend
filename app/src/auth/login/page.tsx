"use client";

import { useState } from "react";
import Link from "next/link"; // Next.js Link
import { useRouter } from "next/navigation"; // Next.js Router
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
import { GraduationCap, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login logic
    setTimeout(() => {
      console.log("Login attempt:", { email, password });
      
      if (email.includes("demo.edu")) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed into your account.",
        });
        
        // Redirect to dashboard in Next.js
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Please use a demo account for this preview.",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary transition-transform group-hover:scale-105">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Project Hub</span>
          </Link>

          <Card variant="elevated" className="border shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@demo.edu"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      href="/forgot-password" 
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="font-medium text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          {/* Demo accounts info */}
          <div className="mt-6 rounded-lg border bg-muted/50 p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-xs font-semibold text-foreground">Demo Accounts:</p>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <p><span className="font-medium text-foreground">Student:</span> student@demo.edu</p>
              <p><span className="font-medium text-foreground">Teacher:</span> teacher@demo.edu</p>
              <p><span className="font-medium text-foreground">Admin:</span> admin@demo.edu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Decorative (Server-side rendered visual) */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center bg-primary relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        <div className="relative px-12 text-primary-foreground max-w-xl mx-auto">
          <blockquote className="space-y-6">
            <p className="text-3xl font-medium leading-tight">
              &quot;University Project Hub has transformed how we manage academic projects. 
              The streamlined workflow saves us countless hours every semester.&quot;
            </p>
            <footer className="flex flex-col">
              <cite className="font-bold text-lg not-italic">Dr. Sarah Mitchell</cite>
              <span className="text-primary-foreground/70">Dean of Engineering, State University</span>
            </footer>
          </blockquote>
        </div>

        {/* Floating background blur elements */}
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse" />
      </div>
    </div>
  );
}