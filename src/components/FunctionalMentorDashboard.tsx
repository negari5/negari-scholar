import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import InfoSection from '@/components/InfoSection';
import { 
  Users, Calendar, MessageSquare, Award, Target, 
  Clock, CheckCircle, TrendingUp, Book, Video,
  FileText, Star, Info, Home, Bell, User,
  Phone, Mail, Globe, BarChart3
} from 'lucide-react';

const FunctionalMentorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const menteeData = [
    { id: 1, name: 'Almaz Tadesse', university: 'Targeting MIT', progress: 75, nextSession: '2024-10-20' },
    { id: 2, name: 'Dawit Mengistu', university: 'Targeting Stanford', progress: 60, nextSession: '2024-10-22' },
    { id: 3, name: 'Sara Ahmed', university: 'Targeting Harvard', progress: 85, nextSession: '2024-10-25' }
  ];

  if (showInfo) {
    return <InfoSection userType="mentor" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/8100b743-8748-46c8-952a-e50f9e5f88e0.png" 
                alt="Negari Logo" 
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
              <div>
                <h1 className="font-comfortaa font-bold text-lg lg:text-xl text-primary">Mentor Dashboard</h1>
                <p className="text-xs lg:text-sm text-muted-foreground hidden sm:block">Welcome back, Dr. Alemayehu</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm"><Bell className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" onClick={() => setShowInfo(true)} className="hidden sm:inline-flex">
                <Info className="h-4 w-4 lg:mr-2" />{!isMobile && 'Info'}
              </Button>
              <Badge variant="secondary">Mentor</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-8 mobile-safe-area">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-4' : 'grid-cols-6'} gap-1`}>
            <TabsTrigger value="home">{isMobile ? <Home className="h-4 w-4" /> : t('home')}</TabsTrigger>
            <TabsTrigger value="mentees">{isMobile ? <Users className="h-4 w-4" /> : 'Mentees'}</TabsTrigger>
            <TabsTrigger value="sessions">{isMobile ? <Calendar className="h-4 w-4" /> : 'Sessions'}</TabsTrigger>
            <TabsTrigger value="resources">{isMobile ? <Book className="h-4 w-4" /> : 'Resources'}</TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2"><CardTitle className="text-xs lg:text-sm">Active Mentees</CardTitle></CardHeader>
                <CardContent><div className="text-xl lg:text-2xl font-bold text-primary">8</div></CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2"><CardTitle className="text-xs lg:text-sm">This Month</CardTitle></CardHeader>
                <CardContent><div className="text-xl lg:text-2xl font-bold text-secondary">24</div><p className="text-xs text-muted-foreground">Sessions</p></CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2"><CardTitle className="text-xs lg:text-sm">Success Rate</CardTitle></CardHeader>
                <CardContent><div className="text-xl lg:text-2xl font-bold text-green-600">92%</div></CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2"><CardTitle className="text-xs lg:text-sm">Rating</CardTitle></CardHeader>
                <CardContent><div className="text-xl lg:text-2xl font-bold text-accent">4.9</div><div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />)}</div></CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Upcoming Sessions</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {menteeData.map(mentee => (
                    <div key={mentee.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{mentee.name}</p>
                        <p className="text-xs text-muted-foreground">{mentee.nextSession}</p>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader><CardTitle>Mentee Progress</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {menteeData.map(mentee => (
                    <div key={mentee.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{mentee.name}</span>
                        <span>{mentee.progress}%</span>
                      </div>
                      <Progress value={mentee.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mentees">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Mentees</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {menteeData.map(mentee => (
                  <Card key={mentee.id} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12"><AvatarFallback>{mentee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{mentee.name}</h3>
                          <p className="text-sm text-muted-foreground">{mentee.university}</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span><span>{mentee.progress}%</span>
                            </div>
                            <Progress value={mentee.progress} className="h-2" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm"><MessageSquare className="h-4 w-4 mr-1" />Chat</Button>
                          <Button size="sm" variant="outline"><Calendar className="h-4 w-4 mr-1" />Schedule</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <div className="text-center py-8">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold">Session Management</h2>
              <p className="text-muted-foreground">Schedule and manage mentoring sessions</p>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader><CardTitle className="flex items-center gap-2"><Book className="h-5 w-5" />Mentor Guides</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground mb-4">Best practices for effective mentoring</p><Button className="w-full">Access Guides</Button></CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader><CardTitle className="flex items-center gap-2"><Video className="h-5 w-5" />Training Videos</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground mb-4">Video tutorials on mentoring techniques</p><Button className="w-full" variant="outline">Watch Videos</Button></CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FunctionalMentorDashboard;