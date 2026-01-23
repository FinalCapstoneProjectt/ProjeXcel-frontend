'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/app/(src)/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Search, Plus, Users, Clock } from 'lucide-react';

const mockDiscussions = [
  {
    id: '1',
    title: 'Data Collection Strategy',
    lastMessage: 'I think we should use surveys for the initial data...',
    participants: ['John D.', 'Jane S.', 'Mike J.'],
    unread: 3,
    updatedAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'UI/UX Design Review',
    lastMessage: "The wireframes look great! Let's discuss the color scheme.",
    participants: ['John D.', 'Jane S.'],
    unread: 0,
    updatedAt: 'Yesterday',
  },
  {
    id: '3',
    title: 'Supervisor Feedback Discussion',
    lastMessage: 'Dr. Johnson suggested we revise the methodology section.',
    participants: ['John D.', 'Jane S.', 'Mike J.'],
    unread: 1,
    updatedAt: '2 days ago',
  },
];

const mockMessages = [
  {
    id: '1',
    sender: 'Jane Smith',
    content:
      "Hey team, I've drafted the initial proposal. Can you all review it?",
    time: '10:30 AM',
    isMe: false,
  },
  {
    id: '2',
    sender: 'You',
    content: 'Looks good! I have some suggestions for the methodology section.',
    time: '10:45 AM',
    isMe: true,
  },
  {
    id: '3',
    sender: 'Mike Johnson',
    content: 'I agree with John. Also, should we add more references?',
    time: '11:00 AM',
    isMe: false,
  },
  {
    id: '4',
    sender: 'Jane Smith',
    content:
      "Great points! I'll incorporate the feedback and share an updated version.",
    time: '11:15 AM',
    isMe: false,
  },
];

export default function DiscussionsPage() {
  const [selectedDiscussion, setSelectedDiscussion] = useState(
    mockDiscussions[0],
  );
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, send message to backend
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Discussions</h1>
            <p className="text-muted-foreground">
              Communicate with your team members and supervisor.
            </p>
          </div>
          <Button className="rounded-full gap-2">
            <Plus className="h-4 w-4" />
            New Discussion
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-16rem)]">
          {/* Discussions List */}
          <Card className="border-none shadow-sm lg:col-span-1 flex flex-col">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10 rounded-full bg-muted/50"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto space-y-2 p-3">
              {mockDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  onClick={() => setSelectedDiscussion(discussion)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedDiscussion.id === discussion.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-sm line-clamp-1">
                      {discussion.title}
                    </h4>
                    {discussion.unread > 0 && (
                      <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                        {discussion.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                    {discussion.lastMessage}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {discussion.participants.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {discussion.updatedAt}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="border-none shadow-sm lg:col-span-2 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {selectedDiscussion.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedDiscussion.participants.join(', ')}
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {selectedDiscussion.participants.slice(0, 3).map((p, i) => (
                    <Avatar
                      key={i}
                      className="h-8 w-8 border-2 border-background"
                    >
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {p
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}
                >
                  {!message.isMe && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {message.sender
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] ${message.isMe ? 'items-end' : ''}`}
                  >
                    {!message.isMe && (
                      <p className="text-xs font-medium mb-1">
                        {message.sender}
                      </p>
                    )}
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isMe
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[44px] max-h-32 rounded-2xl resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="h-11 w-11 rounded-full shrink-0"
                  onClick={handleSendMessage}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
