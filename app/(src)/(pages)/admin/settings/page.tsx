'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/app/(src)/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  Bell,
  Shield,
  Database,
  Globe,
  Loader2,
  Save,
  Key,
} from 'lucide-react';
import { useToast } from '@/app/(src)/hooks/use-toast';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState({
    siteName: 'ASTU Project Hub',
    maxGroupSize: '5',
    proposalDeadline: '2024-06-30',
    maintenanceMode: false,
  });

  const [notifications, setNotifications] = useState({
    newRegistrations: true,
    systemAlerts: true,
    weeklyReports: true,
  });

  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: 'Settings Saved',
        description: 'System settings have been updated.',
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">
            Configure platform-wide settings and preferences.
          </p>
        </div>

        {/* General Settings */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>General Settings</CardTitle>
            </div>
            <CardDescription>
              Basic platform configuration options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="siteName" className="font-semibold">
                  Platform Name
                </Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxGroupSize" className="font-semibold">
                  Max Group Size
                </Label>
                <Input
                  id="maxGroupSize"
                  type="number"
                  value={settings.maxGroupSize}
                  onChange={(e) =>
                    setSettings({ ...settings, maxGroupSize: e.target.value })
                  }
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposalDeadline" className="font-semibold">
                  Proposal Deadline
                </Label>
                <Input
                  id="proposalDeadline"
                  type="date"
                  value={settings.proposalDeadline}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      proposalDeadline: e.target.value,
                    })
                  }
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Maintenance Mode</Label>
                <div className="flex items-center gap-4 h-11">
                  <Button
                    variant={
                      settings.maintenanceMode ? 'destructive' : 'outline'
                    }
                    size="sm"
                    className="rounded-full"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        maintenanceMode: !settings.maintenanceMode,
                      })
                    }
                  >
                    {settings.maintenanceMode ? 'Enabled' : 'Disabled'}
                  </Button>
                  {settings.maintenanceMode && (
                    <Badge variant="destructive">
                      Site is in maintenance mode
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={handleSaveSettings}
              className="rounded-full gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Admin Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure administrative alerts and reports.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: 'newRegistrations',
                label: 'New Registration Alerts',
                desc: 'Get notified when new users register',
              },
              {
                key: 'systemAlerts',
                label: 'System Alerts',
                desc: 'Critical system notifications',
              },
              {
                key: 'weeklyReports',
                label: 'Weekly Reports',
                desc: 'Receive weekly platform usage reports',
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <Button
                  variant={
                    notifications[item.key as keyof typeof notifications]
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  className="rounded-full"
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [item.key]:
                        !notifications[item.key as keyof typeof notifications],
                    })
                  }
                >
                  {notifications[item.key as keyof typeof notifications]
                    ? 'On'
                    : 'Off'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Database & Security */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>Database</CardTitle>
              </div>
              <CardDescription>Database management options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full rounded-full justify-start gap-2"
              >
                <Database className="h-4 w-4" />
                Backup Database
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full justify-start gap-2"
              >
                <Globe className="h-4 w-4" />
                Export Data
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Security and access controls.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full rounded-full justify-start gap-2"
              >
                <Key className="h-4 w-4" />
                Manage API Keys
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full justify-start gap-2"
              >
                <Shield className="h-4 w-4" />
                Security Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
