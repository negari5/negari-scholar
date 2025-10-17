import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/MockAuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Lock, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuperAdminSetup: React.FC = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [setupCode, setSetupCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('Super');
  const [lastName, setLastName] = useState('Admin');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'verify' | 'create'>('verify');

  // Secret setup code - in production this should be environment variable
  const SUPER_ADMIN_SETUP_CODE = 'NEGARI_SUPER_ADMIN_2024';

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleCodeVerification = () => {
    if (setupCode !== SUPER_ADMIN_SETUP_CODE) {
      toast({
        title: "Invalid Setup Code",
        description: "The setup code is incorrect.",
        variant: "destructive"
      });
      return;
    }
    setStep('create');
  };

  const handleSuperAdminCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Create the admin account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`,
            account_type: 'student'
          }
        }
      });

      if (authError) throw authError;

      toast({
        title: "Admin Account Created!",
        description: "Please check your email to verify your account, then sign in.",
      });

      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSetupCode('');
      setStep('verify');
      
      // Redirect to home page
      navigate('/');
    } catch (error: any) {
      console.error('Error creating admin:', error);
      toast({
        title: "Setup Failed",
        description: error.message || "Failed to create Admin account.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Setup</CardTitle>
          <p className="text-muted-foreground">
            {step === 'verify' 
              ? 'Enter the setup code to create the Admin account'
              : 'Create the Admin account'
            }
          </p>
        </CardHeader>
        <CardContent>
          {step === 'verify' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="setupCode">Setup Code</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="setupCode"
                    type="password"
                    placeholder="Enter setup code"
                    value={setupCode}
                    onChange={(e) => setSetupCode(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button 
                onClick={handleCodeVerification}
                className="w-full"
                disabled={!setupCode}
              >
                Verify Code
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSuperAdminCreation} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setStep('verify')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  disabled={loading || !email || !password || !confirmPassword}
                  className="flex-1"
                >
                  {loading ? 'Creating...' : 'Create Admin'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminSetup;