import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import InfoSection from './InfoSection';
import { 
  BookOpen, Target, Award, Calendar, FileText, 
  Users, MessageCircle, TrendingUp, GraduationCap,
  Search, Filter, Plus, Eye, Edit, Trash2,
  CheckCircle, Clock, AlertTriangle, Star,
  Globe, DollarSign, Video, Phone, Mail,
  Download, Share2, ExternalLink, Home,
  Bell, Settings, User, ChevronRight,
  BarChart3, PieChart, LineChart, Info
} from 'lucide-react';

interface Scholarship {
  id: string;
  title: string;
  university: string;
  country: string;
  deadline: string;
  amount: string;
  status: 'eligible' | 'applied' | 'saved' | 'accepted' | 'rejected';
  matchPercentage: number;
  requirements: string[];
}

interface Application {
  id: string;
  scholarship: string;
  university: string;
  status: 'draft' | 'in_progress' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  progress: number;
  nextStep: string;
  deadline: string;
  documents: { name: string; status: string }[];
}

interface Mentor {
  id: string;
  name: string;
  title: string;
  university: string;
  expertise: string[];
  rating: number;
  avatar: string;
  nextSession?: string;
  isOnline: boolean;
}

const EnhancedStudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Enhanced mock data
  const scholarships: Scholarship[] = [
    {
      id: '1',
      title: 'Fulbright Ethiopia Program',
      university: 'Various US Universities',
      country: 'United States',
      deadline: '2024-12-15',
      amount: '$35,000/year',
      status: 'eligible',
      matchPercentage: 92,
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
      matchPercentage: 85,
      requirements: ['Research focus', 'German B2', 'Academic excellence']
    },
    {
      id: '4',
      title: 'Australia Awards Scholarship',
      university: 'University of Melbourne',
      country: 'Australia',
      deadline: '2024-09-30',
      amount: 'Full tuition + living',
      status: 'accepted',
      matchPercentage: 94,
      requirements: ['Development focus', 'IELTS 6.5+', 'Leadership potential']
    }
  ];

  const applications: Application[] = [
    {
      id: '1',
      scholarship: 'MIT EECS PhD Program',
      university: 'Massachusetts Institute of Technology',
      status: 'submitted',
      progress: 85,
      nextStep: 'Wait for interview invitation',
      deadline: '2024-12-01',
      documents: [
        { name: 'Personal Statement', status: 'completed' },
        { name: 'Transcripts', status: 'completed' },
        { name: 'Letters of Recommendation', status: 'pending' },
        { name: 'GRE Scores', status: 'completed' }
      ]
    },
    {
      id: '2',
      scholarship: 'Stanford AI Fellowship',
      university: 'Stanford University',
      status: 'in_progress',
      progress: 60,
      nextStep: 'Submit research proposal',
      deadline: '2024-11-15',
      documents: [
        { name: 'Research Proposal', status: 'in_progress' },
        { name: 'CV/Resume', status: 'completed' },
        { name: 'Portfolio', status: 'draft' }
      ]
    }
  ];

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Alemayehu Tadesse',
      title: 'Professor of Computer Science',
      university: 'MIT',
      expertise: ['Machine Learning', 'Research Methods', 'Academic Writing'],
      rating: 4.9,
      avatar: '/placeholder-mentor1.jpg',
      nextSession: '2024-10-20 15:00',
      isOnline: true
    },
    {
      id: '2',
      name: 'Sarah Johnson, PhD',
      title: 'Senior Research Scientist',
      university: 'Stanford',
      expertise: ['Career Planning', 'Interview Prep', 'Networking'],
      rating: 4.8,
      avatar: '/placeholder-mentor2.jpg',
      isOnline: false
    }
  ];

  const studentStats = {
    totalApplications: 12,
    activeScholarships: 47,
    successRate: 75,
    mentorSessions: 8,
    documentsCompleted: 23,
    upcomingDeadlines: 5
  };

  const achievements = [
    { title: 'Profile Completed', completed: true, points: 100 },
    { title: 'First Application Started', completed: true, points: 150 },
    { title: 'Mentor Session Completed', completed: true, points: 200 },
    { title: 'Essay Submitted', completed: false, points: 250 }
  ];

  if (showInfo) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 lg:px-6 py-4">
            <Button 
              variant="outline" 
              onClick={() => setShowInfo(false)}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
          </div>
        </div>
        <InfoSection userType="student" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible': return 'bg-green-100 text-green-800';
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'saved': return 'bg-gray-100 text-gray-800';
      case 'accepted': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'submitted': return 'bg-indigo-100 text-indigo-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Mobile-optimized header */}
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
                <h1 className="font-comfortaa font-bold text-lg lg:text-xl text-primary">Student Portal</h1>
                <p className="text-xs lg:text-sm text-muted-foreground hidden sm:block">Welcome back, Almaz!</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowInfo(true)}
                className="hidden sm:inline-flex"
              >
                <Info className="h-4 w-4 lg:mr-2" />
                {!isMobile && 'Info'}
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-student.jpg" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-8 mobile-safe-area">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} gap-1`}>
              <TabsTrigger value="dashboard" className="text-xs lg:text-sm">
                {isMobile ? <Home className="h-4 w-4" /> : 'Dashboard'}
              </TabsTrigger>
              <TabsTrigger value="scholarships" className="text-xs lg:text-sm">
                {isMobile ? <Award className="h-4 w-4" /> : 'Scholarships'}
              </TabsTrigger>
              <TabsTrigger value="applications" className="text-xs lg:text-sm">
                {isMobile ? <FileText className="h-4 w-4" /> : 'Applications'}
              </TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="mentors">Mentors</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </>
              )}
            </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-comfortaa font-bold text-primary">Welcome back, Almaz!</h1>
                <p className="text-muted-foreground">Continue your journey to global education</p>
              </div>
              <div className="flex gap-3">
                <Button className="gap-2">
                  <Search className="h-4 w-4" />
                  {!isMobile && 'Find Scholarships'}
                </Button>
              </div>
            </div>

            {/* Stats Grid - Mobile Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium">Applications</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl lg:text-2xl font-bold text-primary">{studentStats.totalApplications}</div>
                  <p className="text-xs text-muted-foreground">+2 this month</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium">Scholarships</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl lg:text-2xl font-bold text-secondary">{studentStats.activeScholarships}</div>
                  <p className="text-xs text-muted-foreground">Available</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium">Success Rate</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl lg:text-2xl font-bold text-green-600">{studentStats.successRate}%</div>
                  <p className="text-xs text-muted-foreground">Above average</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium">Mentors</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl lg:text-2xl font-bold text-purple-600">{studentStats.mentorSessions}</div>
                  <p className="text-xs text-muted-foreground">Sessions</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium">Documents</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl lg:text-2xl font-bold text-accent">{studentStats.documentsCompleted}</div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium">Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl lg:text-2xl font-bold text-orange-600">{studentStats.upcomingDeadlines}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Find Scholarships
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Continue Application
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Mentor Call
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Documents
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Applications */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm lg:text-base truncate">{app.scholarship}</p>
                        <p className="text-xs lg:text-sm text-muted-foreground">{app.university}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span>{app.progress}%</span>
                          </div>
                          <Progress value={app.progress} className="h-2 mt-1" />
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Achievement Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievement Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className={`p-2 rounded-full ${achievement.completed ? 'bg-secondary text-white' : 'bg-muted'}`}>
                        {achievement.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">+{achievement.points} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-primary">Scholarship Explorer</h2>
                <p className="text-muted-foreground">Discover opportunities tailored to your profile</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search scholarships..." className="pl-10" />
                </div>
                <Button variant="outline" size={isMobile ? "sm" : "default"}>
                  <Filter className="h-4 w-4 lg:mr-2" />
                  {!isMobile && 'Filter'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{scholarship.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{scholarship.university}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{scholarship.country}</span>
                        </div>
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
                        {scholarship.requirements.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{scholarship.requirements.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 group-hover:scale-105 transition-transform">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" disabled={scholarship.status === 'applied'}>
                        {scholarship.status === 'applied' ? 'Applied' : 'Apply'}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h2 className="text-2xl font-bold text-primary">My Applications</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Application
              </Button>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold">{app.scholarship}</h3>
                        <p className="text-sm text-muted-foreground">{app.university}</p>
                        <p className="text-sm text-muted-foreground mt-1">Deadline: {app.deadline}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.replace('_', ' ')}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-medium">Overall Progress</span>
                          <span className="font-semibold">{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-2">
                          Next step: {app.nextStep}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-3">Documents Status:</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                          {app.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                              <span className="text-sm">{doc.name}</span>
                              <Badge variant="outline" className={
                                doc.status === 'completed' ? 'bg-green-100 text-green-800' :
                                doc.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                doc.status === 'pending' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }>
                                {doc.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Desktop-only tabs */}
          {!isMobile && (
            <>
              <TabsContent value="mentors" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">Mentor Network</h2>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Find Mentor
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mentors.map((mentor) => (
                    <Card key={mentor.id} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={mentor.avatar} />
                              <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {mentor.isOnline && (
                              <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold">{mentor.name}</h3>
                            <p className="text-muted-foreground">{mentor.title}</p>
                            <p className="text-sm text-muted-foreground">{mentor.university}</p>
                            <div className="flex items-center gap-1 mt-2">
                              {[1,2,3,4,5].map(star => (
                                <Star key={star} className={`h-4 w-4 ${star <= mentor.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                              ))}
                              <span className="text-sm ml-2">{mentor.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Expertise:</p>
                          <div className="flex flex-wrap gap-2">
                            {mentor.expertise.map((skill, idx) => (
                              <Badge key={idx} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {mentor.nextSession && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium">Next Session</p>
                            <p className="text-sm text-muted-foreground">{mentor.nextSession}</p>
                          </div>
                        )}
                        
                        <div className="flex gap-2 mt-4">
                          <Button className="flex-1">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline">
                            <Video className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">Progress & Analytics</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Goals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Applications Submitted</span>
                          <span className="font-semibold">3/5</span>
                        </div>
                        <Progress value={60} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Essays Completed</span>
                          <span className="font-semibold">7/10</span>
                        </div>
                        <Progress value={70} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Mentor Sessions</span>
                          <span className="font-semibold">8/12</span>
                        </div>
                        <Progress value={67} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Achievement Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Profile Completed</p>
                            <p className="text-sm text-muted-foreground">2 weeks ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">First Application Submitted</p>
                            <p className="text-sm text-muted-foreground">1 week ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Interview Preparation</p>
                            <p className="text-sm text-muted-foreground">In progress</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">75%</div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <p className="text-sm text-muted-foreground">Active Applications</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">47</div>
                        <p className="text-sm text-muted-foreground">Scholarships Matched</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">Learning Resources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        Study Guides
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Comprehensive study materials for standardized tests</p>
                      <Button className="w-full">Access Guides</Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-red-500" />
                        Video Tutorials
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Step-by-step application and interview preparation</p>
                      <Button className="w-full" variant="outline">Watch Videos</Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        Essay Templates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Professional templates for personal statements</p>
                      <Button className="w-full" variant="outline">Download Templates</Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        Community Forum
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Connect with fellow students and share experiences</p>
                      <Button className="w-full" variant="outline">Join Community</Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-cyan-500" />
                        Country Guides
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Detailed information about studying in different countries</p>
                      <Button className="w-full" variant="outline">Explore Countries</Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        Success Stories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Inspiring stories from successful scholarship recipients</p>
                      <Button className="w-full" variant="outline">Read Stories</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedStudentDashboard;