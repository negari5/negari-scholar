import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import ConnectMentor from '@/components/ConnectMentor';
import ProfileManager from '@/components/ProfileManager';
import { 
  GraduationCap, Target, Users, BookOpen, Trophy, 
  Star, Calendar, MessageCircle, Bell, Search,
  TrendingUp, Award, CheckCircle, Clock, Plus,
  Bookmark, Heart, Share2, ExternalLink, Filter
} from 'lucide-react';

const EnhancedStudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const isMobile = useIsMobile();

  // Sample data
  const scholarships = [
    {
      id: '1',
      title: 'Fulbright Scholarship Program',
      university: 'Harvard University',
      country: 'United States',
      deadline: '2024-10-15',
      amount: '$45,000/year',
      status: 'eligible',
      matchPercentage: 95,
      requirements: ['GPA 3.5+', 'TOEFL 100+', 'Research proposal', 'Community service']
    },
    {
      id: '2', 
      title: 'Chevening UK Scholarship',
      university: 'Oxford, Cambridge, LSE',
      country: 'United Kingdom',
      deadline: '2024-11-07',
      amount: '£18,000 + tuition',
      status: 'applied',
      matchPercentage: 88,
      requirements: ['Leadership experience', 'IELTS 6.5+', 'Work experience', 'Essay']
    },
    {
      id: '3',
      title: 'DAAD German Scholarships',
      university: 'Max Planck Institute',
      country: 'Germany',
      deadline: '2024-10-31',
      amount: '€934/month',
      status: 'saved',
      matchPercentage: 82,
      requirements: ['German proficiency', 'Academic excellence', 'Motivation letter']
    }
  ];

  const dashboardStats = {
    totalApplications: 12,
    activeScholarships: 8,
    completedApplications: 4,
    acceptanceRate: 33,
    totalFunding: '$127,000',
    savedScholarships: 15
  };

  const recentActivities = [
    { action: 'Applied to Fulbright Scholarship', time: '2 hours ago', type: 'application' },
    { action: 'Saved Chevening Scholarship', time: '1 day ago', type: 'save' },
    { action: 'Completed profile section', time: '3 days ago', type: 'profile' },
    { action: 'Started IELTS preparation', time: '1 week ago', type: 'preparation' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible': return 'bg-green-100 text-green-800';
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'saved': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const quickActions = [
    { title: 'Continue Application', icon: BookOpen, description: 'Complete your Fulbright application', action: 'Continue' },
    { title: 'Schedule Mentor Call', icon: Users, description: 'Book a session with your mentor', action: 'Schedule' },
    { title: 'Practice Interview', icon: MessageCircle, description: 'AI-powered mock interviews', action: 'Start' },
    { title: 'Update Profile', icon: Target, description: 'Keep your profile up to date', action: 'Update' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className={`container mx-auto space-y-4 sm:space-y-6 max-w-7xl ${isMobile ? 'px-4 py-4' : 'px-8 py-8'}`}>
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-primary mb-2">Student Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Track your academic journey and scholarship opportunities</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} mb-4 sm:mb-8`}>
            <TabsTrigger value="home" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Scholarships</span>
            </TabsTrigger>
            <TabsTrigger value="mentors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Connect</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-4 sm:space-y-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
              <Card>
                <CardContent className="p-3 sm:p-6 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-primary">{dashboardStats.totalApplications}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Applications</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-6 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-green-600">{dashboardStats.activeScholarships}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Active Scholarships</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-6 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">{dashboardStats.completedApplications}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-6 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-yellow-600">{dashboardStats.acceptanceRate}%</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Success Rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-6 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-purple-600">{dashboardStats.totalFunding}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Funding</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 sm:p-6 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-orange-600">{dashboardStats.savedScholarships}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Saved</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1 sm:p-2 bg-primary/10 rounded-lg">
                          <action.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-medium">{action.title}</h4>
                          <p className="text-xs text-muted-foreground hidden sm:block">{action.description}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">{action.action}</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Featured Scholarships */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">Recommended for You</CardTitle>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scholarships.slice(0, 3).map((scholarship) => (
                    <Card key={scholarship.id} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-semibold line-clamp-2">{scholarship.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{scholarship.university}</p>
                          </div>
                          <Badge className={getStatusColor(scholarship.status)}>
                            {scholarship.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm sm:text-base font-bold text-primary">{scholarship.amount}</p>
                            <p className="text-xs text-muted-foreground">Funding</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs sm:text-sm font-semibold text-green-600">{scholarship.matchPercentage}% match</p>
                            <p className="text-xs text-muted-foreground">Due: {scholarship.deadline}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 text-xs">Apply Now</Button>
                          <Button size="sm" variant="outline">
                            <Bookmark className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
              <h2 className="text-lg sm:text-2xl font-bold text-primary">Scholarship Opportunities</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold">{scholarship.title}</h3>
                        <p className="text-sm text-muted-foreground">{scholarship.university}</p>
                        <p className="text-xs text-muted-foreground">{scholarship.country}</p>
                      </div>
                      <Badge className={getStatusColor(scholarship.status)}>
                        {scholarship.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-primary">{scholarship.amount}</p>
                        <p className="text-xs text-muted-foreground">Funding amount</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">{scholarship.matchPercentage}% match</p>
                        <p className="text-xs text-muted-foreground">Due: {scholarship.deadline}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Requirements:</p>
                      <div className="flex flex-wrap gap-1">
                        {scholarship.requirements.slice(0, 3).map((req, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 text-sm">
                        {scholarship.status === 'applied' ? 'View Application' : 'Apply Now'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors" className="space-y-4 sm:space-y-6">
            <ConnectMentor />
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl font-bold text-primary">My Applications</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {scholarships.filter(s => s.status === 'applied' || s.status === 'eligible').map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold">{app.title}</h3>
                        <p className="text-sm text-muted-foreground">{app.university}</p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Deadline:</span>
                      <span className="font-semibold">{app.deadline}</span>
                    </div>
                    <Button className="w-full">Continue Application</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 sm:space-y-6">
            <ProfileManager />
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4 sm:space-y-6">
            <div className="text-center py-8 sm:py-12">
              <MessageCircle className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Messages</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto">
                Connect with mentors, peers, and scholarship coordinators.
              </p>
              <Button className="text-sm sm:text-base">Open Messages</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedStudentDashboard;