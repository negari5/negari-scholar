import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import InfoSection from '@/components/InfoSection';
import { 
  Users, Calendar, MessageSquare, Award, Target, 
  Clock, CheckCircle, TrendingUp, Book, Video,
  FileText, Star, Info, Home as HomeIcon
} from 'lucide-react';

const FunctionalMentorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { t } = useLanguage();

  if (activeTab === 'info') {
    return <InfoSection userType="mentor" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/8100b743-8748-46c8-952a-e50f9e5f88e0.png" 
                alt="Negari Logo" 
                className="h-10 w-10"
              />
              <div>
                <h1 className="font-comfortaa font-bold text-xl text-primary">Mentor Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Dr. Alemayehu</p>
              </div>
            </div>
            <Badge variant="secondary">Mentor</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="home">{t('home')}</TabsTrigger>
            <TabsTrigger value="mentees">Mentees</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="info">{t('info')}</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Mentees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mentees">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold">My Mentees</h2>
              <p className="text-muted-foreground">Manage your mentee relationships</p>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold">Sessions</h2>
              <p className="text-muted-foreground">Schedule and manage mentoring sessions</p>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold">Resources</h2>
              <p className="text-muted-foreground">Access mentoring resources and tools</p>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold">Progress Tracking</h2>
              <p className="text-muted-foreground">Monitor mentee progress and outcomes</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FunctionalMentorDashboard;