import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Info, Users, Award, Calendar, FileText, 
  Phone, Mail, MapPin, Globe, Clock, 
  CheckCircle, AlertCircle, Star
} from 'lucide-react';

interface InfoSectionProps {
  userType: 'student' | 'mentor' | 'parent' | 'school';
}

const InfoSection: React.FC<InfoSectionProps> = ({ userType }) => {
  const getInfoContent = () => {
    switch (userType) {
      case 'student':
        return {
          title: 'Student Information Hub',
          sections: [
            {
              title: 'Quick Stats',
              icon: <Award className="h-5 w-5" />,
              items: [
                'Active Applications: 5',
                'Scholarships Found: 127',
                'Completion Rate: 85%',
                'Mentor Sessions: 12'
              ]
            },
            {
              title: 'Upcoming Deadlines',
              icon: <Calendar className="h-5 w-5" />,
              items: [
                'Oxford Scholarship - Dec 15, 2024',
                'Harvard Application - Jan 1, 2025',
                'MIT Early Decision - Nov 30, 2024',
                'Cambridge Interview - Dec 20, 2024'
              ]
            },
            {
              title: 'Recent Activity',
              icon: <CheckCircle className="h-5 w-5" />,
              items: [
                'Completed IELTS prep course',
                'Submitted MIT application',
                'Mentor meeting scheduled',
                'Profile updated'
              ]
            }
          ]
        };
      
      case 'mentor':
        return {
          title: 'Mentor Information Hub',
          sections: [
            {
              title: 'Mentoring Stats',
              icon: <Users className="h-5 w-5" />,
              items: [
                'Active Mentees: 8',
                'Success Rate: 92%',
                'Total Sessions: 156',
                'Hours Contributed: 234'
              ]
            },
            {
              title: 'Upcoming Sessions',
              icon: <Calendar className="h-5 w-5" />,
              items: [
                'Sarah K. - Application Review - Today 3:00 PM',
                'Michael A. - Essay Feedback - Tomorrow 10:00 AM',
                'Hanan B. - Interview Prep - Dec 10, 2:00 PM',
                'Group Session - Scholarship Tips - Dec 12, 4:00 PM'
              ]
            },
            {
              title: 'Recognition',
              icon: <Star className="h-5 w-5" />,
              items: [
                'Top Mentor - October 2024',
                'Student Success Award',
                '5-Star Rating Average',
                '50+ Students Helped'
              ]
            }
          ]
        };

      case 'parent':
        return {
          title: 'Parent Information Hub',
          sections: [
            {
              title: 'Your Child\'s Progress',
              icon: <Users className="h-5 w-5" />,
              items: [
                'Child: Almaz Tadesse (Grade 11)',
                'Applications in Progress: 3',
                'Scholarships Applied: 7',
                'Current GPA: 3.8/4.0'
              ]
            },
            {
              title: 'Financial Planning',
              icon: <FileText className="h-5 w-5" />,
              items: [
                'Estimated Total Cost: $45,000/year',
                'Scholarship Potential: $30,000/year',
                'Family Contribution: $15,000/year',
                'Savings Goal: 60% Complete'
              ]
            },
            {
              title: 'Support Resources',
              icon: <Info className="h-5 w-5" />,
              items: [
                'Parent Support Groups',
                'Financial Aid Webinars',
                'University Information Sessions',
                'Visa Application Guide'
              ]
            }
          ]
        };

      case 'school':
        return {
          title: 'School Information Hub',
          sections: [
            {
              title: 'Institution Stats',
              icon: <Award className="h-5 w-5" />,
              items: [
                'Registered Students: 1,245',
                'Success Rate: 78%',
                'Active Partnerships: 25',
                'Scholarship Winners: 89 this year'
              ]
            },
            {
              title: 'Representative Info',
              icon: <Users className="h-5 w-5" />,
              items: [
                'Name: Dr. Kebede Alemu',
                'Position: International Programs Director',
                'Email: k.alemu@school.edu.et',
                'Phone: +251-911-123456'
              ]
            },
            {
              title: 'Partnership Benefits',
              icon: <CheckCircle className="h-5 w-5" />,
              items: [
                'Student tracking dashboard',
                'Performance analytics',
                'Staff training programs',
                'Global university connections'
              ]
            }
          ]
        };

      default:
        return {
          title: 'Information Hub',
          sections: []
        };
    }
  };

  const info = getInfoContent();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Info className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-comfortaa font-bold text-primary">{info.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {info.sections.map((section, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Information */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Phone className="h-5 w-5" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-secondary" />
              <span className="text-sm">support@negari.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-secondary" />
              <span className="text-sm">+251-911-000000</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary" />
              <span className="text-sm">24/7 Support Available</span>
            </div>
          </div>
          <Button className="mt-4" size="sm">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoSection;