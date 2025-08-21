import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Users, MessageCircle, Star, MapPin, 
  GraduationCap, Calendar, Video, Coffee, BookOpen 
} from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  university: string;
  field: string;
  country: string;
  rating: number;
  sessions: number;
  languages: string[];
  specialties: string[];
  available: boolean;
  bio: string;
  image: string;
}

const ConnectMentor: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('all');

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'PhD in Computer Science',
      university: 'Stanford University',
      field: 'Computer Science',
      country: 'United States',
      rating: 4.9,
      sessions: 156,
      languages: ['English', 'Spanish'],
      specialties: ['AI/ML', 'Software Engineering', 'Research'],
      available: true,
      bio: 'Passionate about helping students achieve their dreams in tech. Former Google engineer.',
      image: '/api/placeholder/64/64'
    },
    {
      id: '2',
      name: 'Prof. David Chen',
      title: 'Professor of Medicine',
      university: 'Harvard Medical School',
      field: 'Medicine',
      country: 'United States',
      rating: 4.8,
      sessions: 203,
      languages: ['English', 'Mandarin'],
      specialties: ['Medical School Prep', 'Research', 'MCAT'],
      available: true,
      bio: 'Dedicated to supporting aspiring medical professionals from diverse backgrounds.',
      image: '/api/placeholder/64/64'
    },
    {
      id: '3',
      name: 'Dr. Amara Okafor',
      title: 'PhD in Engineering',
      university: 'University of Oxford',
      field: 'Engineering',
      country: 'United Kingdom',
      rating: 4.9,
      sessions: 89,
      languages: ['English', 'French', 'Igbo'],
      specialties: ['Civil Engineering', 'Project Management', 'Scholarships'],
      available: false,
      bio: 'Nigerian engineer committed to building bridges between African students and global opportunities.',
      image: '/api/placeholder/64/64'
    },
    {
      id: '4',
      name: 'Prof. Emma Wilson',
      title: 'MBA, Business Strategy',
      university: 'London Business School',
      field: 'Business',
      country: 'United Kingdom',
      rating: 4.7,
      sessions: 134,
      languages: ['English'],
      specialties: ['MBA Prep', 'Entrepreneurship', 'Finance'],
      available: true,
      bio: 'Former McKinsey consultant helping students navigate business education paths.',
      image: '/api/placeholder/64/64'
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.university.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesField = selectedField === 'all' || mentor.field === selectedField;
    return matchesSearch && matchesField;
  });

  const fields = ['all', 'Computer Science', 'Medicine', 'Engineering', 'Business'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Connect with Mentors</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get guidance from successful professionals and students who've walked your path
          </p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Mentors
            </TabsTrigger>
            <TabsTrigger value="my-mentors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              My Mentors
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Sessions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, field, or university..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {fields.map((field) => (
                      <Button
                        key={field}
                        variant={selectedField === field ? "default" : "outline"}
                        onClick={() => setSelectedField(field)}
                        size="sm"
                      >
                        {field === 'all' ? 'All Fields' : field}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{mentor.name}</h3>
                          {mentor.available && (
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{mentor.title}</p>
                        <p className="text-sm font-medium text-primary">{mentor.university}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-muted-foreground">({mentor.sessions} sessions)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{mentor.country}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {mentor.specialties.slice(0, 3).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {mentor.languages.map((language) => (
                          <Badge key={language} variant="outline" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        disabled={!mentor.available}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        disabled={!mentor.available}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-mentors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Mentors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No mentors yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with mentors to get personalized guidance on your educational journey.
                  </p>
                  <Button>Browse Mentors</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming sessions</h3>
                  <p className="text-muted-foreground mb-4">
                    Book a session with a mentor to get started on your journey.
                  </p>
                  <Button>Find Mentors</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConnectMentor;