
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/MockAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UserTypeSelector from './UserTypeSelector';
import EmailConfirmation from './EmailConfirmation';
import DreamCollector from './DreamCollector';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false); // Default to signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [areaOfLiving, setAreaOfLiving] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState<'student' | 'parent' | 'mentor' | 'school' | null>(null);
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [showDreamCollector, setShowDreamCollector] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
            toast({
              title: "Login Failed",
              description: error.message,
              variant: "destructive"
            });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in."
          });
          onClose();
          resetForm();
        }
      } else {
        const { error } = await signUp(email, password, {
          first_name: firstName,
          last_name: lastName,
          education_level: educationLevel,
          area_of_living: areaOfLiving,
          school_type: schoolType,
          phone_number: phoneNumber,
          user_type: userType
        });
        
        if (error) {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Welcome to Negari! Please check your email to verify your account."
          });
          setShowEmailConfirmation(true);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setEducationLevel('');
    setAreaOfLiving('');
    setSchoolType('');
    setPhoneNumber('');
            setUserType(null);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };


  if (showEmailConfirmation) {
    return <EmailConfirmation />;
  }

  if (showDreamCollector) {
    return (
      <DreamCollector 
        onComplete={() => {
          setShowDreamCollector(false);
          onClose();
          resetForm();
        }} 
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/ab8a67f6-7c51-4818-bcd9-d516aed02ac8.png" 
              alt="Negari Logo" 
              className="h-16 w-auto"
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            {isLogin ? 'Welcome Back' : (!isLogin && !userType) ? 'Join Negari' : 'Complete Your Profile'}
          </DialogTitle>
        </DialogHeader>
        
        {!isLogin && !userType && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-primary mb-2">I am a...</h3>
              <p className="text-muted-foreground text-sm">Select the option that best describes you</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'student', title: 'Student', description: 'I am a student looking for scholarship opportunities' },
                { id: 'parent', title: 'Parent', description: 'I am a parent supporting my child\'s education journey' },
                { id: 'mentor', title: 'Mentor', description: 'I want to guide and support students' },
                { id: 'school', title: 'School', description: 'I represent an educational institution' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setUserType(type.id as 'student' | 'parent' | 'mentor' | 'school')}
                  className={`p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-md ${
                    userType === type.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <h4 className="font-semibold text-primary">{type.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-secondary hover:text-primary transition-colors font-medium"
              >
                Already have an account? Sign in
              </button>
            </div>
          </div>
        )}

        {(isLogin || (!isLogin && userType)) && (
          <div className="space-y-4">
            {!isLogin && userType && (
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setUserType(null)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  ← Back to selection
                </button>
                <div className="text-sm text-muted-foreground">
                  Creating {userType} account
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg"
                />
              </div>

              {!isLogin && userType && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className="bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Student-specific fields */}
                  {userType === 'student' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="educationLevel" className="text-gray-700 font-medium">Current Education Level</Label>
                        <Select value={educationLevel} onValueChange={setEducationLevel}>
                          <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900 rounded-lg">
                            <SelectValue placeholder="Select your current education level" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300 rounded-lg">
                            <SelectItem value="elementary">Elementary School</SelectItem>
                            <SelectItem value="middle_school">Middle School</SelectItem>
                            <SelectItem value="high_school">High School</SelectItem>
                            <SelectItem value="preparatory">Preparatory School</SelectItem>
                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="schoolType" className="text-gray-700 font-medium">School Type</Label>
                        <Select value={schoolType} onValueChange={setSchoolType}>
                          <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900 rounded-lg">
                            <SelectValue placeholder="Select your school type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300 rounded-lg">
                            <SelectItem value="public">Public School</SelectItem>
                            <SelectItem value="private">Private School</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* Parent-specific fields */}
                  {userType === 'parent' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="educationLevel" className="text-gray-700 font-medium">Child's Education Level</Label>
                        <Select value={educationLevel} onValueChange={setEducationLevel}>
                          <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900 rounded-lg">
                            <SelectValue placeholder="Select your child's education level" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300 rounded-lg">
                            <SelectItem value="elementary">Elementary School</SelectItem>
                            <SelectItem value="middle_school">Middle School</SelectItem>
                            <SelectItem value="high_school">High School</SelectItem>
                            <SelectItem value="preparatory">Preparatory School</SelectItem>
                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="schoolType" className="text-gray-700 font-medium">Number of Children</Label>
                        <Select value={schoolType} onValueChange={setSchoolType}>
                          <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900 rounded-lg">
                            <SelectValue placeholder="How many children do you have?" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300 rounded-lg">
                            <SelectItem value="1">1 child</SelectItem>
                            <SelectItem value="2">2 children</SelectItem>
                            <SelectItem value="3">3 children</SelectItem>
                            <SelectItem value="4+">4 or more children</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* Mentor-specific fields */}
                  {userType === 'mentor' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="educationLevel" className="text-gray-700 font-medium">Your Education Level</Label>
                        <Select value={educationLevel} onValueChange={setEducationLevel}>
                          <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900 rounded-lg">
                            <SelectValue placeholder="Select your highest education level" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300 rounded-lg">
                            <SelectItem value="undergraduate">Bachelor's Degree</SelectItem>
                            <SelectItem value="graduate">Master's Degree</SelectItem>
                            <SelectItem value="postgraduate">PhD/Doctorate</SelectItem>
                            <SelectItem value="professional">Professional Certification</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="schoolType" className="text-gray-700 font-medium">Area of Expertise</Label>
                        <Select value={schoolType} onValueChange={setSchoolType}>
                          <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900 rounded-lg">
                            <SelectValue placeholder="Select your area of expertise" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300 rounded-lg">
                            <SelectItem value="engineering">Engineering & Technology</SelectItem>
                            <SelectItem value="medicine">Medicine & Health Sciences</SelectItem>
                            <SelectItem value="business">Business & Economics</SelectItem>
                            <SelectItem value="education">Education & Teaching</SelectItem>
                            <SelectItem value="arts">Arts & Humanities</SelectItem>
                            <SelectItem value="sciences">Natural Sciences</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* School-specific fields */}
                  {userType === 'school' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="educationLevel" className="text-gray-700 font-medium">Institution Type</Label>
                        <Select value={educationLevel} onValueChange={setEducationLevel}>
                          <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900 rounded-lg">
                            <SelectValue placeholder="Select your institution type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300 rounded-lg">
                            <SelectItem value="elementary">Elementary School</SelectItem>
                            <SelectItem value="high_school">High School</SelectItem>
                            <SelectItem value="preparatory">Preparatory School</SelectItem>
                            <SelectItem value="university">University</SelectItem>
                            <SelectItem value="college">College</SelectItem>
                            <SelectItem value="vocational">Vocational Training Center</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="schoolType" className="text-gray-700 font-medium">Institution Category</Label>
                        <Select value={schoolType} onValueChange={setSchoolType}>
                          <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900 rounded-lg">
                            <SelectValue placeholder="Select institution category" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-300 rounded-lg">
                            <SelectItem value="public">Public Institution</SelectItem>
                            <SelectItem value="private">Private Institution</SelectItem>
                            <SelectItem value="international">International School</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="areaOfLiving" className="text-gray-700 font-medium">City</Label>
                    <Select value={areaOfLiving} onValueChange={setAreaOfLiving}>
                      <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900 rounded-lg">
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 max-h-60 rounded-lg">
                        {ethiopianCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+251 9xx xxx xxx"
                      className="bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg"
                    />
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-primary text-white font-semibold rounded-lg py-3" 
                disabled={loading || (!isLogin && !userType)}
              >
                {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>
          </div>
        )}

        {(isLogin || (!isLogin && userType)) && (
          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
