import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/MockAuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, Shield, CreditCard, Bell } from 'lucide-react';

const ProfileManager: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const [profileForm, setProfileForm] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    phone: profile?.phone || '',
    city: profile?.city || '',
    education_level: profile?.education_level || '',
    school_name: profile?.school_name || '',
    user_type: profile?.user_type || 'student'
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await updateProfile(profileForm);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully."
      });
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeDescription = (type: string) => {
    switch (type) {
      case 'student': return 'Students looking for scholarship opportunities';
      case 'parent': return 'Parents supporting their child\'s education journey';
      case 'mentor': return 'Mentors guiding and supporting students';
      case 'school': return 'Educational institutions and representatives';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-negari-indigo/20 rounded-lg">
          <User className="h-6 w-6 text-negari-indigo" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-negari-indigo">Profile Settings</h2>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={profileForm.first_name}
                      onChange={(e) => setProfileForm({...profileForm, first_name: e.target.value})}
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={profileForm.last_name}
                      onChange={(e) => setProfileForm({...profileForm, last_name: e.target.value})}
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      placeholder="+251..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                      placeholder="Your city"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="education_level">Education Level</Label>
                    <Select value={profileForm.education_level} onValueChange={(value) => setProfileForm({...profileForm, education_level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="grade10">Grade 10</SelectItem>
                        <SelectItem value="grade11">Grade 11</SelectItem>
                        <SelectItem value="grade12">Grade 12</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="school_name">School Name</Label>
                    <Input
                      id="school_name"
                      value={profileForm.school_name}
                      onChange={(e) => setProfileForm({...profileForm, school_name: e.target.value})}
                      placeholder="Your school"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="user_type">Student Type</Label>
                  <Select value={profileForm.user_type} onValueChange={(value) => setProfileForm({...profileForm, user_type: value as 'student' | 'parent' | 'mentor' | 'school' | 'admin' | 'super_admin'})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="student">
                        <div>
                          <div className="font-medium">Student</div>
                          <div className="text-sm text-gray-500">{getUserTypeDescription('student')}</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="parent">
                        <div>
                          <div className="font-medium">Parent</div>
                          <div className="text-sm text-gray-500">{getUserTypeDescription('parent')}</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="mentor">
                        <div>
                          <div className="font-medium">Mentor</div>
                          <div className="text-sm text-gray-500">{getUserTypeDescription('mentor')}</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="school">
                        <div>
                          <div className="font-medium">School</div>
                          <div className="text-sm text-gray-500">{getUserTypeDescription('school')}</div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={loading} className="bg-negari-orange hover:bg-negari-indigo">
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email Address</Label>
                <Input value={profile?.email} disabled className="bg-gray-50" />
                <p className="text-sm text-gray-500 mt-1">Email cannot be changed directly. Contact support if needed.</p>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Account Type</h4>
                  <p className="text-sm text-gray-600">
                    {getUserTypeDescription(profile?.user_type || 'student')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{profile?.user_type}</Badge>
                  {profile?.is_admin && (
                    <Badge className="bg-negari-indigo text-white">Admin</Badge>
                  )}
                  {profile?.is_super_admin && (
                    <Badge className="bg-negari-gold text-white">Super Admin</Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Profile Completion</h4>
                <div className="flex items-center gap-2">
                  {profile?.has_completed_profile ? (
                    <>
                      <Badge className="bg-green-100 text-green-800">Complete</Badge>
                      <span className="text-sm text-gray-600">Your profile is complete</span>
                    </>
                  ) : (
                    <>
                      <Badge className="bg-yellow-100 text-yellow-800">Incomplete</Badge>
                      <span className="text-sm text-gray-600">Please complete your profile</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription & Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Current Plan</h4>
                  <p className="text-sm text-gray-600">
                    {profile?.subscription_tier === 'premium' ? 'Premium Plan' : 'Free Plan'}
                  </p>
                </div>
                <Badge className={profile?.subscription_tier === 'premium' ? 'bg-negari-gold text-white' : 'bg-gray-100 text-gray-800'}>
                  {profile?.subscription_tier || 'Free'}
                </Badge>
              </div>

              {profile?.subscription_tier === 'free' && (
                <div className="p-4 bg-gradient-to-r from-negari-gold/10 to-negari-orange/10 rounded-lg">
                  <h4 className="font-medium text-negari-indigo mb-2">Upgrade to Premium</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Get access to AI Essay Coach, Mock Interviews, Mentor Booking, and more for just $3/month.
                  </p>
                  <Button className="bg-negari-gold hover:bg-negari-orange text-white">
                    Upgrade Now
                  </Button>
                </div>
              )}

              {profile?.subscription_tier === 'premium' && profile?.subscription_expires_at && (
                <div>
                  <Label>Subscription Expires</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(profile.subscription_expires_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Scholarship Alerts</h4>
                    <p className="text-sm text-gray-600">Get notified about new scholarships matching your profile</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Deadline Reminders</h4>
                    <p className="text-sm text-gray-600">Receive reminders about upcoming application deadlines</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Platform Updates</h4>
                    <p className="text-sm text-gray-600">Stay informed about new features and announcements</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Messages</h4>
                    <p className="text-sm text-gray-600">Get notified when you receive new messages</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileManager;