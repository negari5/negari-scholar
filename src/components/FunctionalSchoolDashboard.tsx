import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import InfoSection from '@/components/InfoSection';
import { 
  Users, GraduationCap, TrendingUp, Award, Building,
  BarChart3, Globe, Target, Info, Home as HomeIcon,
  CheckCircle, Clock, BookOpen, Shield
} from 'lucide-react';

const FunctionalSchoolDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { t } = useLanguage();

  if (activeTab === 'info') {
    return <InfoSection userType="school" />;
  }

  const schoolStats = {
    totalStudents: 1245,
    activeApplications: 89,
    successRate: 78,
    partnershipsActive: 25,
    scholarshipWinners: 67
  };

  const recentActivity = [
    { student: 'Sarah Kebede', action: 'Accepted to Harvard', date: '2 days ago', status: 'success' },
    { student: 'Michael Abebe', action: 'Scholarship received', date: '1 week ago', status: 'success' },
    { student: 'Hanan Teshome', action: 'Application submitted', date: '3 days ago', status: 'pending' },
  ];

  const partnerships = [
    { name: 'Harvard University', students: 15, status: 'active' },
    { name: 'MIT', students: 12, status: 'active' },
    { name: 'Oxford University', students: 8, status: 'active' },
    { name: 'Stanford University', students: 10, status: 'active' },
  ];

  const representativeInfo = {
    name: 'Dr. Kebede Alemu',
    position: 'International Programs Director',
    email: 'k.alemu@school.edu.et',
    phone: '+251-911-123456',
    experience: '8 years'
  };

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
                <h1 className="font-comfortaa font-bold text-xl text-primary">School Dashboard</h1>
                <p className="text-sm text-muted-foreground">Bole High School - International Programs</p>
              </div>
            </div>
            <Badge variant="secondary">School Partner</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="home">{t('home')}</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="representative">Representative</TabsTrigger>
            <TabsTrigger value="info">{t('info')}</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {/* School Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{schoolStats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Registered students</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{schoolStats.activeApplications}</div>
                  <p className="text-xs text-muted-foreground">In progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{schoolStats.successRate}%</div>
                  <p className="text-xs text-muted-foreground">Acceptance rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{schoolStats.partnershipsActive}</div>
                  <p className="text-xs text-muted-foreground">Active partnerships</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Winners This Year</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{schoolStats.scholarshipWinners}</div>
                  <p className="text-xs text-muted-foreground">Scholarship recipients</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Student Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{activity.student}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                        <Badge variant={activity.status === 'success' ? 'default' : 'outline'}>
                          {activity.status === 'success' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      View All Students
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Add New Student
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Globe className="h-4 w-4 mr-2" />
                      Partnership Opportunities
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Student Management</h2>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Grade 9:</span>
                        <span className="font-semibold">245 students</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grade 10:</span>
                        <span className="font-semibold">289 students</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grade 11:</span>
                        <span className="font-semibold">356 students</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grade 12:</span>
                        <span className="font-semibold">355 students</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Preparing:</span>
                        <span className="font-semibold text-yellow-600">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Submitted:</span>
                        <span className="font-semibold text-blue-600">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accepted:</span>
                        <span className="font-semibold text-green-600">67</span>
                      </div>
                      <div className="flex justify-between">
                        <span>With Scholarships:</span>
                        <span className="font-semibold text-purple-600">45</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Destinations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>USA:</span>
                        <span className="font-semibold">34 students</span>
                      </div>
                      <div className="flex justify-between">
                        <span>UK:</span>
                        <span className="font-semibold">18 students</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Canada:</span>
                        <span className="font-semibold">12 students</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Australia:</span>
                        <span className="font-semibold">8 students</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="partnerships">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">University Partnerships</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partnerships.map((partnership, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{partnership.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-800">
                          {partnership.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Students placed: <span className="font-semibold">{partnership.students}</span>
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="outline">Contact</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">School Performance Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Success Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 mx-auto text-green-500 mb-4" />
                      <p className="text-2xl font-bold text-green-600">+15%</p>
                      <p className="text-muted-foreground">Improvement from last year</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Applications:</span>
                          <span className="font-semibold">89 (↑12%)</span>
                        </div>
                        <Progress value={75} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Acceptances:</span>
                          <span className="font-semibold">67 (↑8%)</span>
                        </div>
                        <Progress value={65} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="representative">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">School Representative Information</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Primary Representative</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <p className="text-lg font-semibold">{representativeInfo.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Position</label>
                        <p className="text-lg">{representativeInfo.position}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Experience</label>
                        <p className="text-lg">{representativeInfo.experience}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-lg">{representativeInfo.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="text-lg">{representativeInfo.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button>Update Information</Button>
                        <Button variant="outline">Contact Support</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FunctionalSchoolDashboard;