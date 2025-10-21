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

  // TODO: Fetch from database
  const menteeData: any[] = [];

  if (showInfo) {
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
                <Button variant="outline" size="sm" onClick={() => setShowInfo(false)}>
                  <Home className="h-4 w-4 lg:mr-2" />{!isMobile && 'Back to Dashboard'}
                </Button>
                <Badge variant="secondary">Mentor</Badge>
              </div>
            </div>
          </div>
        </header>
        <InfoSection userType="mentor" />
      </div>
    );
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
                <CardContent><div className="text-xl lg:text-2xl font-bold text-primary">0</div></CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2"><CardTitle className="text-xs lg:text-sm">This Month</CardTitle></CardHeader>
                <CardContent><div className="text-xl lg:text-2xl font-bold text-secondary">0</div><p className="text-xs text-muted-foreground">Sessions</p></CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2"><CardTitle className="text-xs lg:text-sm">Success Rate</CardTitle></CardHeader>
                <CardContent><div className="text-xl lg:text-2xl font-bold text-green-600">0%</div></CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2"><CardTitle className="text-xs lg:text-sm">Rating</CardTitle></CardHeader>
                <CardContent><div className="text-xl lg:text-2xl font-bold text-accent">0</div></CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Upcoming Sessions</CardTitle></CardHeader>
                <CardContent className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader><CardTitle>Mentee Progress</CardTitle></CardHeader>
                <CardContent className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No mentees assigned yet</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mentees">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Mentees</h2>
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Mentees Yet</h3>
                  <p className="text-muted-foreground">You haven't been assigned any mentees yet.</p>
                </CardContent>
              </Card>
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