import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Search, Users, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Study Group - Computer Science",
      lastMessage: "Thanks for sharing the scholarship info!",
      time: "2 min ago",
      unread: 2,
      type: "group",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      lastMessage: "How did your IELTS prep go?",
      time: "1 hour ago",
      unread: 0,
      type: "direct",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Mentorship Program",
      lastMessage: "Your next session is scheduled for tomorrow",
      time: "3 hours ago",
      unread: 1,
      type: "official",
      avatar: "/placeholder.svg"
    }
  ];

  const currentMessages = [
    {
      id: 1,
      sender: "Alex Chen",
      content: "Hey everyone! I just found this amazing scholarship opportunity for international students. It covers full tuition and living expenses!",
      time: "10:30 AM",
      isMe: false
    },
    {
      id: 2,
      sender: "You",
      content: "That sounds incredible! Could you share the details?",
      time: "10:32 AM",
      isMe: true
    },
    {
      id: 3,
      sender: "Maria Rodriguez",
      content: "I'm interested too! Is it for undergraduate or graduate programs?",
      time: "10:35 AM",
      isMe: false
    },
    {
      id: 4,
      sender: "Alex Chen",
      content: "It's for both! The deadline is next month, so we have some time to prepare our applications.",
      time: "10:38 AM",
      isMe: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: "Message Sent!",
        description: "Your message has been delivered to the group.",
      });
      setNewMessage("");
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-sunrise-gradient cultural-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Messages</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow students, mentors, and study groups
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="negari-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-negari-indigo">
                <Users className="h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setActiveChat(conversation.id)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      activeChat === conversation.id ? 'bg-negari-orange/10 border-r-2 border-negari-orange' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-negari-indigo truncate">
                            {conversation.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                            {conversation.unread > 0 && (
                              <Badge className="bg-negari-orange text-white text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {conversation.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="negari-card lg:col-span-2">
            {activeChat ? (
              <>
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2 text-negari-indigo">
                    <MessageSquare className="h-5 w-5" />
                    {conversations.find(c => c.id === activeChat)?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[400px] flex flex-col">
                  {/* Messages */}
                  <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] rounded-lg p-3 ${
                          message.isMe
                            ? 'bg-negari-orange text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {!message.isMe && (
                            <p className="text-xs font-semibold mb-1 opacity-70">
                              {message.sender}
                            </p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isMe ? 'text-white/70' : 'text-gray-500'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-grow"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-negari-orange hover:bg-negari-indigo"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
