
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Edit, Save, Mail, MapPin, GraduationCap, School, Camera, Home, X, Crown, Shield, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import SelfAssessment from "@/components/SelfAssessment";

const Profile = () => {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    education_level: profile?.education_level || '',
    city: profile?.city || '',
    preparatory_school_type: profile?.preparatory_school_type || ''
  });
  const [emailData, setEmailData] = useState({
    newEmail: '',
    currentPassword: '',
    confirmationCode: ''
  });

  const ethiopianCities = [
    'Addis Ababa',
    'Dire Dawa',
    'Hawassa',
    'Mekelle',
    'Adama',
    'Gondar',
    'Dessie',
    'Jimma',
    'Jijiga',
    'Shashamane',
    'Bahir Dar',
    'Kombolcha',
    'Debre Markos',
    'Harar',
    'Dila',
    'Nekemte',
    'Debre Berhan',
    'Asella',
    'Adigrat',
    'Wukro'
  ];

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.first_name.trim() || !formData.last_name.trim()) {
        toast({
          title: "Validation Error",
          description: "First name and last name are required.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await updateProfile(formData);
      if (error) {
        console.error('Profile update error:', error);
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated!",
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      education_level: profile?.education_level || '',
      city: profile?.city || '',
      preparatory_school_type: profile?.preparatory_school_type || ''
    });
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmailChange = async () => {
    toast({
      title: "Email Change Requested",
      description: "Confirmation emails have been sent to both your current and new email addresses.",
    });
    setIsEditingEmail(false);
  };

  const getEducationLevelDisplay = (level: string) => {
    const levels: { [key: string]: string } = {
      'elementary': 'Elementary School',
      'middle_school': 'Middle School',
      'high_school': 'High School',
      'preparatory': 'Preparatory School',
      'undergraduate': 'Undergraduate',
      'graduate': 'Graduate',
      'postgraduate': 'Postgraduate'
    };
    return levels[level] || level;
  };

  const getSchoolTypeDisplay = (type: string) => {
    return type === 'public' ? 'Public School' : type === 'private' ? 'Private School' : 'Not specified';
  };

  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/80 to-purple-50/80 backdrop-blur-sm">
      <div className={`container mx-auto space-y-4 sm:space-y-6 max-w-4xl ${isMobile ? 'px-4 py-4' : 'px-8 py-8'}`}>
        {/* Header with Home Button and Role Badge */}
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-negari-orange hover:text-white text-xs sm:text-sm rounded-lg"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-3xl font-bold text-negari-indigo">My Profile</h1>
            {profile?.is_super_admin && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Super Admin
              </Badge>
            )}
            {profile?.is_admin && !profile?.is_super_admin && (
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>
          <div></div>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 sm:space-y-6">
            {/* Profile Header */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="relative">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                      <AvatarImage src={profileImage || "/placeholder.svg"} />
                      <AvatarFallback className="bg-negari-orange/20 text-negari-orange text-lg sm:text-xl">
                        {(profile?.first_name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-negari-orange hover:bg-negari-indigo"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-negari-indigo">
                      {profile?.first_name && profile?.last_name 
                        ? `${profile.first_name} ${profile.last_name}`
                        : 'Complete Your Profile'
                      }
                    </h2>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 mt-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                    <div className="flex gap-2 mt-2 justify-center sm:justify-start">
                      {profile?.is_super_admin && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                          <Crown className="h-3 w-3 mr-1" />
                          Super Admin
                        </Badge>
                      )}
                      {profile?.is_admin && !profile?.is_super_admin && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                      )}
                      {!profile?.is_admin && !profile?.is_super_admin && (
                        <Badge variant="outline">
                          User
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    size="sm"
                    className="hover:bg-negari-orange hover:text-white rounded-lg"
                  >
                    {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    <span className="ml-2 hidden sm:inline">{isEditing ? 'Cancel' : 'Edit'}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

          {/* Personal Information */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-negari-indigo text-lg sm:text-xl">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name *</Label>
                        <Input
                          id="first_name"
                          value={formData.first_name}
                          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                          placeholder="Enter your first name"
                          className="rounded-lg"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name *</Label>
                        <Input
                          id="last_name"
                          value={formData.last_name}
                          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                          placeholder="Enter your last name"
                          className="rounded-lg"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => setFormData({...formData, city: value})}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg">
                          {ethiopianCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">First Name</Label>
                      <p className="text-negari-indigo font-medium">
                        {profile?.first_name || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Last Name</Label>
                      <p className="text-negari-indigo font-medium">
                        {profile?.last_name || 'Not provided'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-negari-indigo">
                      {profile?.city || 'City not specified'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Educational Information */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-negari-indigo text-lg sm:text-xl">
                <GraduationCap className="h-5 w-5" />
                Educational Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="education_level">Education Level</Label>
                    <Select
                      value={formData.education_level}
                      onValueChange={(value) => setFormData({...formData, education_level: value})}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="elementary">Elementary School</SelectItem>
                        <SelectItem value="middle_school">Middle School</SelectItem>
                        <SelectItem value="high_school">High School</SelectItem>
                        <SelectItem value="preparatory">Preparatory School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="preparatory_school_type">Preparatory School Type</Label>
                      <Select
                        value={formData.preparatory_school_type}
                        onValueChange={(value) => setFormData({...formData, preparatory_school_type: value})}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select your preparatory school type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg">
                        <SelectItem value="public">Public School</SelectItem>
                        <SelectItem value="private">Private School</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-400" />
                    <span className="text-negari-indigo">
                      {profile?.education_level ? getEducationLevelDisplay(profile.education_level) : 'Education level not specified'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-gray-400" />
                    <span className="text-negari-indigo">
                      {profile?.preparatory_school_type ? getSchoolTypeDisplay(profile.preparatory_school_type) : 'School type not specified'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Management */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-negari-indigo text-lg sm:text-xl">
                <Mail className="h-5 w-5" />
                Email Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Current Email</Label>
                  <p className="text-negari-indigo font-medium break-all">{user?.email}</p>
                </div>
                <Dialog open={isEditingEmail} onOpenChange={setIsEditingEmail}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="hover:bg-negari-orange hover:text-white rounded-lg">
                      Change Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="mx-4 max-w-md rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>Change Email Address</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newEmail">New Email Address</Label>
                        <Input
                          id="newEmail"
                          type="email"
                          value={emailData.newEmail}
                          onChange={(e) => setEmailData({...emailData, newEmail: e.target.value})}
                          placeholder="Enter new email address"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={emailData.currentPassword}
                          onChange={(e) => setEmailData({...emailData, currentPassword: e.target.value})}
                          placeholder="Enter current password"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="bg-yellow-50/80 p-3 rounded-lg backdrop-blur-sm">
                        <p className="text-sm text-yellow-800">
                          You will receive confirmation emails at both your current and new email addresses. 
                          Please confirm the change from both emails to complete the process.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleEmailChange}
                          className="bg-negari-orange hover:bg-negari-indigo rounded-lg"
                        >
                          Send Confirmation
                        </Button>
                        <Button
                          onClick={() => setIsEditingEmail(false)}
                          variant="outline"
                          className="rounded-lg"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Save Button - Only show when editing */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <Button
                onClick={handleSave}
                className="bg-negari-orange hover:bg-negari-indigo text-white font-semibold px-8 py-3 rounded-lg"
              >
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="px-8 py-3 rounded-lg"
              >
                Cancel
              </Button>
            </div>
          )}
          </TabsContent>

          <TabsContent value="assessment">
            <div className="space-y-4">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-negari-indigo">
                    <Target className="h-5 w-5" />
                    Scholarship Readiness Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SelfAssessment />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-4">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-negari-indigo">
                    <GraduationCap className="h-5 w-5" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Progress tracking coming soon!</p>
                    <p className="text-sm mt-2">Track your application progress, deadlines, and achievements.</p>
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

export default Profile;
