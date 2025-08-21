import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Target, BookOpen, MessageCircle, Award, Calendar, 
  Users, FileText, TrendingUp, Clock, Star, Home,
  Search, Bell, Settings, Info, User, GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnhancedStudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const scholarships = [
    {
      id: 1,
      title: 'Fulbright Scholarship Program',
      provider: 'U.S. Department of State',
      deadline: '2024-10-15',
      amount: '$50,000',
      status: 'open',
      match: 95
    },
    {
      id: 2,
      title: 'Rhodes Scholarship',
      provider: 'Rhodes Trust',
      deadline: '2024-09-30',
      amount: '$70,000',
      status: 'applied',
      match: 87
    },
    {
      id: 3,
      title: 'Gates Cambridge Scholarship',
      provider: 'Gates Cambridge Trust',
      deadline: '2024-12-05',
      amount: '$60,000',
      status: 'draft',
      match: 92
    }
  ];

  const applications = [
    {
      id: 1,
      scholarship: 'Fulbright Program',
      status: 'in_progress',
      completion: 75,
      deadline: '2024-10-15'
    },
    {
      id: 2,
      scholarship: 'Rhodes Scholarship', 
      status: 'submitted',
      completion: 100,
      deadline: '2024-09-30'
    }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      field: 'International Relations',
      university: 'Harvard University',
      rating: 4.9,
      sessions: 12
    },
    {
      id: 2,
      name: 'Michael Chen',
      field: 'Computer Science',
      university: 'MIT',
      rating: 4.8,
      sessions: 8
    }
  ];

  const achievements = [
    { title: 'Profile Completed', completed: true, points: 100 },
    { title: 'First Application Started', completed: true, points: 150 },
    { title: 'Mentor Session Completed', completed: true, points: 200 },
    { title: 'Essay Submitted', completed: false, points: 250 }
  ];

  const handleHomeClick = () => {
    // Stay on student dashboard, don't go to main landing page
    setActiveTab('dashboard');
    // Scroll to top to show the dashboard content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/8100b743-8748-46c8-952a-e50f9e5f88e0.png" 
                  alt="Negari Logo" 
                  className="h-10 w-10"
                />
                <span className="font-comfortaa font-bold text-xl text-primary">Negari</span>
                <Badge variant="secondary">Student Portal</Badge>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-4">
                <Button 
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={handleHomeClick}
                  className="gap-2"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Button>
                <Button 
                  variant={activeTab === 'scholarships' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setActiveTab('scholarships')}
                  className="gap-2"
                >
                  <Target className="h-4 w-4" />
                  Scholarships
                </Button>
                <Button 
                  variant={activeTab === 'applications' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setActiveTab('applications')}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Applications
                </Button>
                <Button 
                  variant={activeTab === 'mentors' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setActiveTab('mentors')}
                  className="gap-2"
                >
                  <Users className="h-4 w-4" />
                  Mentors
                </Button>
                <Button 
                  variant={activeTab === 'info' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setActiveTab('info')}
                  className="gap-2"
                >
                  <Info className="h-4 w-4" />
                  Info
                </Button>
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-comfortaa font-bold text-primary">Welcome back, Student!</h1>
                <p className="text-muted-foreground">Continue your journey to global education</p>
              </div>
              <div className="flex gap-3">
                <Button className="gap-2">
                  <Search className="h-4 w-4" />
                  Find Scholarships
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">12</p>
                      <p className="text-sm text-muted-foreground">Available Scholarships</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <FileText className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">3</p>
                      <p className="text-sm text-muted-foreground">Active Applications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-full">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">2</p>
                      <p className="text-sm text-muted-foreground">Active Mentors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">750</p>
                      <p className="text-sm text-muted-foreground">Points Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{app.scholarship}</span>
                        <Badge variant={app.status === 'submitted' ? 'default' : 'secondary'}>
                          {app.status === 'submitted' ? 'Submitted' : 'In Progress'}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{app.completion}% complete</span>
                        <span>Due: {app.deadline}</span>
                      </div>
                      <Progress value={app.completion} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievement Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${achievement.completed ? 'bg-secondary text-white' : 'bg-muted'}`}>
                        {achievement.completed ? <Award className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">+{achievement.points} points</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-comfortaa font-bold text-primary">Scholarship Explorer</h2>
              <div className="flex gap-3">
                <Input placeholder="Search scholarships..." className="w-64" />
                <Button>Search</Button>
              </div>
            </div>

            <div className="grid gap-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{scholarship.title}</CardTitle>
                        <p className="text-muted-foreground">{scholarship.provider}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{scholarship.amount}</p>
                        <Badge variant={scholarship.status === 'applied' ? 'default' : 'secondary'}>
                          {scholarship.match}% match
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Deadline: {scholarship.deadline}</span>
                        </div>
                        <Badge variant={scholarship.status === 'open' ? 'secondary' : 'default'}>
                          {scholarship.status === 'open' ? 'Open' : scholarship.status === 'applied' ? 'Applied' : 'Draft'}
                        </Badge>
                      </div>
                      <Button size="sm">
                        {scholarship.status === 'open' ? 'Apply Now' : 'View Details'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <h2 className="text-2xl font-comfortaa font-bold text-primary">My Applications</h2>
            
            <div className="grid gap-6">
              {applications.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{app.scholarship}</CardTitle>
                      <Badge variant={app.status === 'submitted' ? 'default' : 'secondary'}>
                        {app.status === 'submitted' ? 'Submitted' : 'In Progress'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Completion Progress</span>
                          <span>{app.completion}%</span>
                        </div>
                        <Progress value={app.completion} className="h-2" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Deadline: {app.deadline}
                        </span>
                        <Button size="sm">
                          {app.status === 'submitted' ? 'View Application' : 'Continue'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors" className="space-y-6">
            <h2 className="text-2xl font-comfortaa font-bold text-primary">My Mentors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <p className="text-muted-foreground">{mentor.field}</p>
                        <p className="text-sm text-muted-foreground">{mentor.university}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {mentor.sessions} sessions completed
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-6">
            <h2 className="text-2xl font-comfortaa font-bold text-primary">Student Information Center</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Study Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive guides for scholarship applications, essay writing, and interview preparation.
                  </p>
                  <Button size="sm" className="w-full">Browse Guides</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    University Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Explore universities worldwide, their programs, requirements, and student experiences.
                  </p>
                  <Button size="sm" className="w-full">Explore Universities</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Success Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Read inspiring stories from Ethiopian students who successfully studied abroad.
                  </p>
                  <Button size="sm" className="w-full">Read Stories</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Keep track of scholarship deadlines, test dates, and application timelines.
                  </p>
                  <Button size="sm" className="w-full">View Calendar</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Download templates for personal statements, recommendation letters, and more.
                  </p>
                  <Button size="sm" className="w-full">Download Templates</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Community Forum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Connect with other Ethiopian students, ask questions, and share experiences.
                  </p>
                  <Button size="sm" className="w-full">Join Discussion</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedStudentDashboard;