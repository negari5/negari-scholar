import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Building, Mail, Phone, MapPin, User, Globe, GraduationCap } from 'lucide-react';

interface SchoolRegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SchoolRegistrationForm: React.FC<SchoolRegistrationFormProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // School Information
    schoolName: '',
    schoolType: '',
    location: '',
    establishedYear: '',
    studentCount: '',
    website: '',
    description: '',
    internationalPrograms: '',
    
    // Representative Information
    repFirstName: '',
    repLastName: '',
    repTitle: '',
    repEmail: '',
    repPhone: '',
    repDepartment: '',
    
    // Additional Details
    partnershipGoals: '',
    currentPartnerships: '',
    supportNeeded: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('School registration data:', formData);
    
    toast({
      title: "Partnership Application Submitted",
      description: "Thank you for your interest in partnering with us. Our team will review your application and contact you within 7 business days."
    });
    
    // Reset form
    setFormData({
      schoolName: '',
      schoolType: '',
      location: '',
      establishedYear: '',
      studentCount: '',
      website: '',
      description: '',
      internationalPrograms: '',
      repFirstName: '',
      repLastName: '',
      repTitle: '',
      repEmail: '',
      repPhone: '',
      repDepartment: '',
      partnershipGoals: '',
      currentPartnerships: '',
      supportNeeded: ''
    });
    
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            School Partnership Application
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* School Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">School Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schoolName">School Name *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="schoolName"
                    className="pl-10"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="schoolType">School Type *</Label>
                <Select value={formData.schoolType} onValueChange={(value) => handleInputChange('schoolType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select school type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public School</SelectItem>
                    <SelectItem value="private">Private School</SelectItem>
                    <SelectItem value="international">International School</SelectItem>
                    <SelectItem value="university">University/College</SelectItem>
                    <SelectItem value="technical">Technical/Vocational School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    className="pl-10"
                    placeholder="City, Region, Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                  value={formData.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentCount">Number of Students</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="studentCount"
                    type="number"
                    className="pl-10"
                    value={formData.studentCount}
                    onChange={(e) => handleInputChange('studentCount', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    type="url"
                    className="pl-10"
                    placeholder="https://www.school.edu"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">School Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of your school, its mission, and academic programs..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="internationalPrograms">Current International Programs</Label>
              <Textarea
                id="internationalPrograms"
                placeholder="Describe any existing international programs, partnerships, or study abroad initiatives..."
                value={formData.internationalPrograms}
                onChange={(e) => handleInputChange('internationalPrograms', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Representative Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">School Representative Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="repFirstName">First Name *</Label>
                <Input
                  id="repFirstName"
                  value={formData.repFirstName}
                  onChange={(e) => handleInputChange('repFirstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="repLastName">Last Name *</Label>
                <Input
                  id="repLastName"
                  value={formData.repLastName}
                  onChange={(e) => handleInputChange('repLastName', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="repTitle">Job Title *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="repTitle"
                    className="pl-10"
                    placeholder="e.g., Director of International Programs"
                    value={formData.repTitle}
                    onChange={(e) => handleInputChange('repTitle', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="repDepartment">Department</Label>
                <Input
                  id="repDepartment"
                  placeholder="e.g., International Affairs"
                  value={formData.repDepartment}
                  onChange={(e) => handleInputChange('repDepartment', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="repEmail">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="repEmail"
                    type="email"
                    className="pl-10"
                    value={formData.repEmail}
                    onChange={(e) => handleInputChange('repEmail', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="repPhone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="repPhone"
                    type="tel"
                    className="pl-10"
                    value={formData.repPhone}
                    onChange={(e) => handleInputChange('repPhone', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Partnership Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Partnership Details</h3>
            <div>
              <Label htmlFor="partnershipGoals">Partnership Goals *</Label>
              <Textarea
                id="partnershipGoals"
                placeholder="What are your goals for this partnership? What do you hope to achieve for your students?"
                value={formData.partnershipGoals}
                onChange={(e) => handleInputChange('partnershipGoals', e.target.value)}
                required
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="currentPartnerships">Current University Partnerships</Label>
              <Textarea
                id="currentPartnerships"
                placeholder="List any current partnerships with universities or international education organizations..."
                value={formData.currentPartnerships}
                onChange={(e) => handleInputChange('currentPartnerships', e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="supportNeeded">Support Needed</Label>
              <Textarea
                id="supportNeeded"
                placeholder="What specific support or services would be most valuable for your school and students?"
                value={formData.supportNeeded}
                onChange={(e) => handleInputChange('supportNeeded', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SchoolRegistrationForm;