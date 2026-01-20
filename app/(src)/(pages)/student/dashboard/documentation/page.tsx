"use client";

import { useState } from "react";
import { DashboardLayout } from "@/app/(src)/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    Upload,
    FileText,
    FileCode,
    Presentation,
    Link as LinkIcon,
    Trash2,
    Download,
    CheckCircle2,
    Clock,
    ExternalLink
} from "lucide-react";

const mockDocuments = [
    {
        id: "1",
        name: "Final_Report_v2.pdf",
        type: "report",
        size: "2.4 MB",
        uploadedAt: "2024-01-15",
        status: "approved",
    },
    {
        id: "2",
        name: "Presentation_Final.pptx",
        type: "presentation",
        size: "8.1 MB",
        uploadedAt: "2024-01-14",
        status: "pending",
    },
];

export default function Documentation() {
    const [codeLink, setCodeLink] = useState("https://github.com/university/project-analytics");
    const [demoLink, setDemoLink] = useState("");

    const getDocIcon = (type: string) => {
        switch (type) {
            case "report":
                return <FileText className="h-8 w-8 text-red-500" />;
            case "presentation":
                return <Presentation className="h-8 w-8 text-orange-500" />;
            case "code":
                return <FileCode className="h-8 w-8 text-blue-500" />;
            default:
                return <FileText className="h-8 w-8 text-gray-500" />;
        }
    };

    return (
        <DashboardLayout role="student">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Project Documentation</h1>
                    <p className="text-muted-foreground">
                        Upload your final project documents and link your code repository
                    </p>
                </div>

                {/* Project Info */}
                <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">AI-Powered Student Performance Analytics</h3>
                                <p className="text-sm text-muted-foreground">
                                    Approved on January 10, 2024
                                </p>
                            </div>
                            <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-700 hover:bg-green-500/20 shadow-none border-0">
                                <CheckCircle2 className="h-3 w-3" />
                                Approved
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Upload Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Documentation Progress</CardTitle>
                        <CardDescription>
                            Complete all required documentation to finalize your project
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span>2 of 4 documents uploaded</span>
                            <span className="font-medium">50%</span>
                        </div>
                        <Progress value={50} />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span>Final Report</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-yellow-600" />
                                <span>Presentation</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span>Code Repository</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Demo Link</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* File Upload */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Documents</CardTitle>
                            <CardDescription>
                                Upload your final report, presentation, and other documents
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                                <p className="text-sm text-muted-foreground mb-2">
                                    Drag and drop files here, or click to browse
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Supported formats: PDF, DOCX, PPTX (Max 50MB)
                                </p>
                                <Button variant="outline" className="mt-4">
                                    Select Files
                                </Button>
                            </div>

                            {/* Uploaded Files */}
                            <div className="space-y-3">
                                {mockDocuments.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            {getDocIcon(doc.type)}
                                            <div>
                                                <p className="font-medium text-sm">{doc.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {doc.size} • Uploaded {doc.uploadedAt}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={doc.status === "approved" ? "secondary" : "secondary"} className={doc.status === "approved" ? "bg-green-500/10 text-green-700 hover:bg-green-500/20 border-0" : ""}>
                                                {doc.status}
                                            </Badge>
                                            <Button variant="ghost" size="icon">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* External Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>External Links</CardTitle>
                            <CardDescription>
                                Link your code repository and live demo
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="codeLink">Code Repository</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="codeLink"
                                            placeholder="https://github.com/username/project"
                                            value={codeLink}
                                            onChange={(e) => setCodeLink(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    {codeLink && (
                                        <Button variant="outline" size="icon" asChild>
                                            <a href={codeLink} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                                {codeLink && (
                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Repository linked
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="demoLink">Live Demo (Optional)</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="demoLink"
                                            placeholder="https://your-project-demo.com"
                                            value={demoLink}
                                            onChange={(e) => setDemoLink(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    {demoLink && (
                                        <Button variant="outline" size="icon" asChild>
                                            <a href={demoLink} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="font-medium mb-3">Quick Links</h4>
                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full justify-start gap-2" asChild>
                                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                            <FileCode className="h-4 w-4" />
                                            Connect to GitHub
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start gap-2" asChild>
                                        <a href="https://gitlab.com" target="_blank" rel="noopener noreferrer">
                                            <FileCode className="h-4 w-4" />
                                            Connect to GitLab
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button size="lg" className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Submit Documentation
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
